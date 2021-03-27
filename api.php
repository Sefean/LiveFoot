<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$database_name = "livefoot";
	
	$conexion = mysqli_connect($servername, $username, $password);
	$database = mysqli_select_db($conexion, $database_name);
	mysqli_set_charset($conexion, 'utf8'); 

	$action = $_GET["action"];

	switch ($action) {
		case 'insertarClub':
			insertarClub();
			break;
		case 'insertarEquipo':
			insertarEquipo();
			break;
		case 'insertarJugador':
			insertarJugador();
			break;
		case 'insertarPartido':
			insertarPartido();
			break;
		case 'insertarNarracion':
			insertarNarracion();
			break;
		case 'login':
			login();
			break;
		case 'getProvincias':
			getProvincias();
			break;
		case 'uploadImg':
			uploadImg();
			break;
		case 'getInfoClub':
			getInfoClub();
			break;
		case 'getEquipos':
			getEquipos();
			break;
		default:
			echo 'Parametro action erroneo';
			break;
	}

	//funcion que inserta un nuevo club en la base de datos
	function insertarClub()
	{

		$encodedData = file_get_contents('php://input');
		$decodedData = json_decode($encodedData, true);

		$email = $decodedData['email'];
		$pass = password_hash($decodedData['pass'], PASSWORD_BCRYPT);
		$nombre = $decodedData['nombre'];
		//$escudo = $decodedData['escudo'];
		//$id_subscripcion = $decodedData['id_subscripcion'];
		//$fecha_ini_subs = $decodedData['fecha_ini_subs'];
		//$fecha_fin_subs = $decodedData['fecha_fin_subs'];
		//$id_provincia = $decodedData['id_provincia'];
	
		$escudo = "defaultEscudo.png";
		$id_subscripcion = 1;
		$fecha_ini_subs = "2021-03-01";
		$fecha_fin_subs = "2021-03-01";
		$id_provincia = 1;

		$query = "INSERT into `CLUBES` (`email`, `pass`, `nombre`, `escudo`, `id_subscripcion`, `fecha_ini_subs`, `fecha_fin_subs`, `id_provincia`) VALUES ('$email', '$pass', '$nombre', '$escudo', $id_subscripcion, '$fecha_ini_subs', '$fecha_fin_subs', $id_provincia)";

		//echo $query;

		$resultado = mysqli_query($GLOBALS["conexion"], $query);

		if($resultado)
		{
			$mensaje = "Club introducido con exito.";
		}
		else
		{
			$mensaje = "Error al introducir el club.";
		}

		$respuesta[] = array("Mensaje"=>$mensaje);

		echo json_encode($respuesta);
	}

	//funcion que inserta un nuevo equipo en el club correspondiente
	function insertarEquipo()
	{
		$id_club = $_POST['id_club'];
		$nombre = $_POST['nombre'];
		$estadio = $_POST['estadio'];
		$minutos_partido = $_POST['minutos_partido'];

		$query = "INSERT INTO `EQUIPOS` (`id_club`, `nombre`, `estadio`, `minutos_partido`) VALUES ($id_club, '$nombre', '$estadio', $minutos_partido);";

		//echo $query;

		$resultado = mysqli_query($GLOBALS["conexion"], $query);

		if($resultado)
		{
			$mensaje = "Equipo introducido con exito.";
		}
		else
		{
			$mensaje = "Error al introducir el equipo.";
		}

		$respuesta[] = array("Mensaje"=>$mensaje);
		echo json_encode($respuesta);
	}

	//funcion que inserta un jugador en el equipo correspondiente
	function insertarJugador()
	{
		$id_equipo = $_POST['id_equipo'];
		$nombre = $_POST['nombre'];
		$dorsal = $_POST['dorsal'];
		$foto = $_POST['foto'];

		$query = "INSERT INTO `JUGADORES` (`id_equipo`, `nombre`, `dorsal`, `minutos_partido`) VALUES ($id_equipo, '$nombre', $dorsal, '$foto');";

		//echo $query;

		$resultado = mysqli_query($GLOBALS["conexion"], $query);

		if($resultado)
		{
			$mensaje = "Jugador introducido con exito.";
		}
		else
		{
			$mensaje = "Error al introducir el jugador.";
		}

		$respuesta[] = array("Mensaje"=>$mensaje);
		echo json_encode($respuesta);

	}

	function insertarPartido()
	{
		$id_equipo = $_POST['id_equipo'];
		$local = $_POST['nombre'];
		$estadio = $_POST['estadio'];
		$minutos_partido = $_POST['minutos_partido'];
		$nombre_rival = $_POST['nombre_rival'];
		$escudo_rival = $_POST['escudo_rival'];
		$fecha_hora = $_POST['fecha_hora'];
		$goles_local = $_POST['goles_local'];
		$goles_visitante = $_POST['goles_visitante'];
		$resultado = $_POST['resultado'];

		$query = "INSERT INTO `PARTIDOS` (`id_equipo`, `local`, `estadio`, `minutos_partido`, `nombre_rival`, `escudo_rival`, `fecha_hora`, `goles_local`, `goles_visitante`, `resultado`) VALUES ($id_equipo, $local, '$estadio', $minutos_partido, '$nombre_rival', '$escudo_rival', '$fecha_hora', $goles_local, $goles_visitante, '$resultado')";

		//echo $query;

		$resultado = mysqli_query($GLOBALS["conexion"], $query);

		if($resultado)
		{
			$mensaje = "Partido introducido con exito.";
		}
		else
		{
			$mensaje = "Error al introducir el partido.";
		}

		$respuesta[] = array("Mensaje"=>$mensaje);
		echo json_encode($respuesta);
	}

	function insertarNarracion()
	{
		$id_partido = $_POST['id_partido'];
		$id_tipo = $_POST['id_tipo'];
		$comentario = $_POST['comentario'];
		$id_jugador1 = $_POST['id_jugador1'];
		$id_jugador2 = $_POST['id_jugador2'];

		$query = "INSERT INTO `NARRACIONES` (`id_partido`, `id_tipo`, `comentario`, `id_jugador1`, `id_jugador2`) VALUES ($id_partido, $id_tipo, '$comentario', id_jugador1, id_jugador2);";

		//echo $query;

		$resultado = mysqli_query($GLOBALS["conexion"], $query);

		if($resultado)
		{
			$mensaje = "Narracion introducida con exito.";
		}
		else
		{
			$mensaje = "Error al introducir la narracion.";
		}

		$respuesta[] = array("Mensaje"=>$mensaje);
		echo json_encode($respuesta);
	}

	function login()
	{	
		$encodedData = file_get_contents('php://input');
		$decodedData = json_decode($encodedData, true);

		$email = $decodedData['email'];
		$pass = $decodedData['pass'];

		$query = "SELECT `id_club`, `pass` FROM `CLUBES` WHERE `email` = '$email'";

		$result = $GLOBALS["conexion"]->query($query);
		if($result->num_rows > 0)
		{
			$row = mysqli_fetch_array($result);
			if(password_verify($pass, $row['pass']))
			{
				$return = $row['id_club'];
			}
			else
			{
				$return = 0;
			}
		}
		else
		{
			$return = 0;
		}

		echo ($return);
	}

	function getProvincias()
	{
		$query = "SELECT * FROM `PROVINCIAS` ORDER BY provincia";

		$arr_provincias = array();
		$result = $GLOBALS["conexion"]->query($query);
		if($result->num_rows > 0)
		{
			while($row = mysqli_fetch_array($result)){
				$arr_provincias[$row['id_provincia']] = $row['provincia'];
				//echo $row['provincia'];
			}

			echo json_encode($arr_provincias, JSON_UNESCAPED_UNICODE);
		}

	}

	function uploadImg()
	{
		$encodedData = file_get_contents('php://input');
		/*$decodedData = json_decode($encodedData, true);

		$number = 1;

		$img = $decodedData['image'];*/

		echo json_encode($encodedData);
		/*$shuffledid = str_shuffle(124243543534543534);
		$url = $shuffledid;

		$path = __DIR__ . "/img/escudo_". $number .".png";

		list($width,$height,$type) = getimagesize($img);

		$pic = imagecreatefrompng($img);
		$bg = imagecreatetruecolor(600, 700);

		imagecopyresampled($bg, $pic, 0, 0, 0, 0, 600, 700, $width, $height);

		imagepng($bg, $path.'/'.$url.'.png');

		imagedestroy($pic);

		echo json_encode("done");*/
	}

	function getInfoClub()
	{
		$encodedData = file_get_contents('php://input');
		$decodedData = json_decode($encodedData, true);

		$idclub = $decodedData['idclub'];

		$query = "SELECT `nombre`, `escudo` FROM `CLUBES` WHERE `id_club` = " . $idclub;

		$result = $GLOBALS["conexion"]->query($query);
		$returnArray = array();

		while($row = mysqli_fetch_array($result))
		{
			$returnArray["nombre"] = $row["nombre"];
			$returnArray["escudo"] = $row["escudo"];		
		}
		
		$equipos = getEquipos($idclub);

		$returnArray["equipos"] = $equipos;

		echo json_encode($returnArray);
	}

	function getEquipos($idclub)
	{
		$query = "SELECT `id_equipo`, `nombre` FROM `EQUIPOS` WHERE `id_club` = " . $idclub . "ORDER BY `nombre`";

		$result = $GLOBALS["conexion"]->query($query);
		$arrayEquipos = array();

		while($row = mysqli_fetch_assoc($result))
		{
			$arrayEquipos[] = $row;	
		}

		return $arrayEquipos;
	}
?> 