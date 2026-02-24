<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Admin login — validates credentials and checks role.
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !$user->isAdmin()) {
            return response()->json(['error' => 'Invalid admin credentials.'], 401);
        }

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Invalid admin credentials.'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->guard('api')->factory()->getTTL() * 60,
            'user' => $user->only(['id', 'name', 'email', 'role']),
        ]);
    }

    /**
     * Get the authenticated admin user.
     */
    public function me()
    {
        $user = auth()->guard('api')->user();
        return response()->json($user->only(['id', 'name', 'email', 'role']));
    }

    /**
     * Admin logout.
     */
    public function logout()
    {
        auth()->guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out.']);
    }

    /**
     * Dashboard stats from the database.
     */
    public function dashboard()
    {
        $totalUsers = User::where('role', 'user')->count();
        $verifiedUsers = User::where('role', 'user')->whereNotNull('email_verified_at')->count();
        $unverifiedUsers = User::where('role', 'user')->whereNull('email_verified_at')->count();

        // Recent registrations (last 6 months, monthly)
        $userGrowth = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $userGrowth[] = [
                'month' => $date->format('M'),
                'users' => User::where('role', 'user')
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        }

        // Recent users (last 5)
        $recentUsers = User::where('role', 'user')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at', 'email_verified_at']);

        return response()->json([
            'stats' => [
                'total_users' => $totalUsers,
                'verified_users' => $verifiedUsers,
                'unverified_users' => $unverifiedUsers,
            ],
            'user_growth' => $userGrowth,
            'recent_users' => $recentUsers,
        ]);
    }

    /**
     * List all users with optional search and pagination.
     */
    public function users(Request $request)
    {
        $query = User::where('role', 'user');

        // Search by name or email
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by verification status
        if ($request->query('status') === 'verified') {
            $query->whereNotNull('email_verified_at');
        } elseif ($request->query('status') === 'unverified') {
            $query->whereNull('email_verified_at');
        }

        $users = $query->latest()->paginate($request->query('per_page', 15));

        return response()->json($users);
    }

    /**
     * Get a single user.
     */
    public function showUser(int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update a user (name, email, role, or reset password).
     */
    public function updateUser(Request $request, int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|between:2,100',
            'email' => 'sometimes|string|email|max:100|unique:users,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        // Allow toggling email verification
        if ($request->has('email_verified')) {
            $user->email_verified_at = $request->email_verified
                ? ($user->email_verified_at ?? Carbon::now())
                : null;
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Delete a user.
     */
    public function deleteUser(int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
}
