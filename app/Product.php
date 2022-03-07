<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = ['name','category_id'];

    public function cat(){
        return $this->belongsTo(Category::class,'id');
    }
}
