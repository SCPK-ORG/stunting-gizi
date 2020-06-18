<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    protected $primaryKey = 'id_balita';
    // protected $dates = ['date_of_birth'];
    protected $fillable = ['nama', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'nama_ortu', 'alamat_ortu', 'no_hp_ortu', 'user_id'];
    public $timestamps = false;
}
