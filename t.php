<?php
require_once __DIR__ . "/vendor/autoload.php";

use Aiitec\FirstPackage\HelloWorld;

HelloWorld::say();

$helloWorld = new HelloWorld();
$helloWorld->say2();
