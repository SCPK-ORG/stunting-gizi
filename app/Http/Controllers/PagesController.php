<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        return view('landingpage');
    }

    public function login()
    {
        return view('login.login1');
    }

    public function admin()
    {
        return view('admin.index');
    }

    public function anggota()
    {
        return view('admin.d_anggota');
    }

    public function balita()
    {
        return view('admin.d_balita');
    }

    public function kms()
    {
        return view('admin.d_kms');
    }

    public function user()
    {
        return view('user.index');
    }
}
