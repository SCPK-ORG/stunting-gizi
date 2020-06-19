<?php

namespace App;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    protected $primaryKey = 'id_balita';
    // protected $dates = ['date_of_birth'];
    protected $fillable = ['nama', 'jenis_kelamin', 'tempat_lahir', 'tanggal_lahir', 'nama_ortu', 'alamat_ortu', 'no_hp_ortu', 'user_id'];
    public $timestamps = false;

    public function getAgeAttribute()
    {
        // $years = $this->attributes['tanggal_lahir']->diff(Carbon::now())->format('m');
        // return $years;
        // return Carbon::parse($this->attributes['tanggal_lahir'])->format('m');
        return Carbon::parse($this->attributes['tanggal_lahir'])->age;
    }
}
