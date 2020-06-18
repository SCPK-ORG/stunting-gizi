<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    protected $primaryKey = 'id_anggota';
    // protected $dates = ['date_of_birth'];
    protected $fillable = ['nama_anggota', 'jenis_kelamin', 'alamat', 'id_jabatan', 'nomor_hp', 'user_id'];
    public $timestamps = false;
}
