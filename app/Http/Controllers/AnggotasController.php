<?php

namespace App\Http\Controllers;

use App\Anggota;
use App\Jabatan;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AnggotasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $anggotas = Anggota::leftjoin('jabatans', 'anggotas.id_jabatan', '=', 'jabatans.id')
                            ->select('anggotas.*', 'jabatans.*')
                            ->get();
        // dd($anggotas);
        $jabatans = Jabatan::all();
        return view('admin.d_anggota', compact('anggotas', 'jabatans'));
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
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'nama_anggota' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
            'nomor_hp' => 'required|digits_between:8,12|numeric',
        ]);

        if ($validator->passes()) {
            // dd($request->all());
            $user = new User;
            $user->role = 'admin';
            // $photo = 'profile.jpg';
            $user->name = $request->nama_anggota;
            $user->email = $request->email;
            $user->password = bcrypt('rahasia');
            $user->remember_token = Str::random(60);
            $user->save();
            // dd($user);

            $request->request->add(['user_id' => $user->id]);
            // $request->merge(['no_hp' => (string)($request->no_hp)]);
            // $request->request->add(['photo' => $photo]);
            // $request->request->add(['bio' => 'Empty']);

            Anggota::create($request->all());
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
     * @param  \App\Anggota  $anggota
     * @return \Illuminate\Http\Response
     */
    public function show(Anggota $anggota)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Anggota  $anggota
     * @return \Illuminate\Http\Response
     */
    public function edit(Anggota $anggota)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Anggota  $anggota
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Anggota $anggota)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Anggota  $anggota
     * @return \Illuminate\Http\Response
     */
    public function destroy($anggota)
    {
        $anggotas = Anggota::where('id_anggota', $anggota)->first();
        // dd($anggotas);
        Anggota::destroy($anggota);
        User::destroy('id', $anggotas->user_id);
        return redirect()->back();
    }
}
