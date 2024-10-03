<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;

class AuthController extends Controller

{
    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'user' => 'required|email',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        return response()->json(['msg' => 'Datos inválidos'], 400);
    }

    $user = User::where('Email', $request->user)->first();

    if (!$user) {
        return response()->json(['msg' => 'Usuario inválido'], 401);
    }

    if (!password_verify($request->password, $user->password)) {
        return response()->json(['msg' => 'Clave inválida'], 401);
    }

    $payload = [
        'userId' => $user->id,
        'Email' => $user->Email,
    ];

    $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

 
    return response()->json([
        'msg' => 'Logueado con éxito',
        'token' => $token,
        'user' => $user // 
    ]);
}

}