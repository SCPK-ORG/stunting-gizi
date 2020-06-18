<?php

namespace App\Http\Controllers;

use App\Kms;
use Illuminate\Http\Request;

class KmsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kms = Kms::all();
        return view('admin.d_kms', compact('kms'));
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function show(Kms $kms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function edit(Kms $kms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kms $kms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kms $kms)
    {
        //
    }
}
