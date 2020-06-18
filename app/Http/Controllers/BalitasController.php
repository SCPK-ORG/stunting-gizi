<?php

namespace App\Http\Controllers;

use App\Balita;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BalitasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $balitas = Balita::all();
        return view('admin.d_balita', compact('balitas'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'nama_ortu' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users',
            'alamat_ortu' => 'required',
            'no_hp_ortu' => 'required|digits_between:8,12|numeric',
        ]);
            
        // dd($request->all());
        if ($validator->passes()) {
            // dd($request->all());
            $user = new User;
            $user->role = 'ortu';
            // $photo = 'profile.jpg';
            $user->name = $request->nama;
            $user->email = $request->email;
            $user->password = bcrypt('rahasia');
            $user->remember_token = Str::random(60);
            $user->save();
            // dd($user);

            $request->request->add(['user_id' => $user->id]);
            // $request->merge(['no_hp' => (string)($request->no_hp)]);
            // $request->request->add(['photo' => $photo]);
            // $request->request->add(['bio' => 'Empty']);

            Balita::create($request->all());
            return redirect()->back();

            // if (Auth::attempt($request->only('email', 'password'))) {
            //     return redirect('/home');
            // } else {
            //     return redirect('/login');
            // }
        } else {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Balita  $balita
     * @return \Illuminate\Http\Response
     */
    public function show(Balita $balita)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Balita  $balita
     * @return \Illuminate\Http\Response
     */
    public function edit(Balita $balita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Balita  $balita
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Balita $balita)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Balita  $balita
     * @return \Illuminate\Http\Response
     */
    public function destroy(Balita $balita)
    {
        dd($balita);
    }
}
