<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database_name = 'livefoot';

set_time_limit(0);

$conexion = mysqli_connect($servername, $username, $password);
$database = mysqli_select_db($conexion, $database_name);
mysqli_set_charset($conexion, 'utf8');

$action = $_GET['action'];

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
    case 'uploadImg':
        uploadImg();
        break;
    case 'getInfoClub':
        getInfoClub();
        break;
    case 'getInfoEquipo':
        getInfoEquipo();
        break;
    case 'getPartidos':
        getPartidos();
        break;
    case 'getJugadores':
        getJugadores();
        break;
    case 'actualizarNarracion':
        actualizarNarracion();
        break;
    case 'updateMinutoActual':
        updateMinutoActual();
        break;
    case 'gol':
        gol();
        break;
    case 'cambiarResultado':
        cambiarResultado();
        break;
    case 'getClubes':
        getClubes();
        break;
    case 'getNarraciones':
        getNarraciones();
        break;
    case 'getNombreEquipo':
        getNombreEquipo();
        break;
    case 'cambiosClub':
        cambiosClub();
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

    $escudo = 'defaultEscudo.png';

    $query = "INSERT into `CLUBES` (`email`, `pass`, `nombre`, `escudo`) VALUES ('$email', '$pass', '$nombre', '$escudo')";

    //echo $query;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Club introducido con exito.';
    } else {
        $mensaje = 'Error al introducir el club.';
    }

    $respuesta[] = ['Mensaje' => $mensaje];

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

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Equipo introducido con exito.';
    } else {
        $mensaje = 'Error al introducir el equipo.';
    }

    $respuesta[] = ['Mensaje' => $mensaje];
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

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Jugador introducido con exito.';
    } else {
        $mensaje = 'Error al introducir el jugador.';
    }

    $respuesta[] = ['Mensaje' => $mensaje];
    echo json_encode($respuesta);
}

function insertarPartido()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];
    $local = $decodedData['local'];
    $estadio = $decodedData['estadio'];
    $minutos_partido = $decodedData['minutos_partido'];
    $nombre_rival = $decodedData['nombre_rival'];
    $escudo_rival = $decodedData['escudo_rival'];
    $fecha_hora = $decodedData['fecha_hora'];

    $goles_local = 0;
    $goles_visitante = 0;
    $resultado = '-';

    $query = "INSERT INTO `PARTIDOS` (`id_equipo`, `local`, `estadio`, `minutos_partido`, `nombre_rival`, `escudo_rival`, `fecha_hora`, `goles_local`, `goles_visitante`, `resultado`) VALUES ($id_equipo, $local, '$estadio', $minutos_partido, '$nombre_rival', '$escudo_rival', '$fecha_hora', $goles_local, $goles_visitante, '$resultado')";

    //echo $query;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Partido introducido con exito.';
    } else {
        $mensaje = 'Error al introducir el partido.';
    }

    echo $mensaje;
}

function insertarNarracion()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];
    $id_tipo = $decodedData['id_tipo'];
    $comentario = $decodedData['comentario'];
    $minuto = $decodedData['minuto'];

    if ($id_tipo != 7) {
        $id_jugador1 = $decodedData['id_jugador1'];
    }
    $id_jugador2 = 0;

    if ($id_tipo == 7) {
        $query = "INSERT INTO `NARRACIONES` (`id_partido`, `id_tipo`, `comentario`, `minuto`) VALUES ($id_partido, $id_tipo, '$comentario', $minuto);";
    } elseif ($id_tipo != 6) {
        $query = "INSERT INTO `NARRACIONES` (`id_partido`, `id_tipo`, `comentario`, `minuto`, `id_jugador1`) VALUES ($id_partido, $id_tipo, '$comentario', $minuto, $id_jugador1);";
    } else {
        $id_jugador1 = $decodedData['id_jugador2'];
        $query = "INSERT INTO `NARRACIONES` (`id_partido`, `id_tipo`, `comentario`, `minuto`, `id_jugador1`, `id_jugador2`) VALUES ($id_partido, $id_tipo, '$comentario', $minuto, $id_jugador1, $id_jugador2);";
    }

    //echo $query;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Narración añadida.';
    } else {
        $mensaje = 'Error al añadir narración.';
    }

    echo $mensaje;
}

function login()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $email = $decodedData['email'];
    $pass = $decodedData['pass'];

    $query = "SELECT `id_club`, `pass` FROM `CLUBES` WHERE `email` = '$email'";

    $result = $GLOBALS['conexion']->query($query);
    if ($result->num_rows > 0) {
        $row = mysqli_fetch_array($result);
        if (password_verify($pass, $row['pass'])) {
            $return = $row['id_club'];
        } else {
            $return = 0;
        }
    } else {
        $return = 0;
    }

    echo $return;
}

function uploadImg()
{
    $img = $_FILES['image']['tmp_name'];
    $imgsize = getimagesize($img);

    echo 'asd';
    /*$shuffledid = str_shuffle(124243543534543534);

		$url = $shuffledid;

		$path = "http://localhost/liveFoot/img/";

		list($width,$height,$type) = getimagesize($img);

		$pic = imagecreatefrompng($img);
		$bg = imagecreatetruecolor(600,700);

		imagecopyresampled($bg,$pic,0,0,0,0,600,700,$width,$height);

		imagepng($bg, $path.'/'.$url.'.png');
		imagedestroy($pic);
		echo json_encode("done");*/
}

function getInfoClub()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_club = $decodedData['idclub'];

    $query =
        'SELECT `nombre`, `escudo` FROM `CLUBES` WHERE `id_club` = ' . $id_club;

    $result = $GLOBALS['conexion']->query($query);
    $returnArray = [];

    while ($row = mysqli_fetch_array($result)) {
        $returnArray['nombre'] = $row['nombre'];
        $returnArray['escudo'] = $row['escudo'];
    }

    $equipos = getEquipos($id_club);

    $returnArray['equipos'] = $equipos;

    echo json_encode($returnArray);
}

function getInfoEquipo()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];

    $query =
        'SELECT `nombre`, `estadio`, `minutos_partido` FROM `EQUIPOS` WHERE `id_equipo` = ' .
        $id_equipo;

    $result = $GLOBALS['conexion']->query($query);
    $returnArray = [];

    while ($row = mysqli_fetch_array($result)) {
        $returnArray['nombre'] = $row['nombre'];
        $returnArray['estadio'] = $row['estadio'];
        $returnArray['minutos_partido'] = $row['minutos_partido'];
    }

    echo json_encode($returnArray);
}

function getEquipos($id_club)
{
    $query =
        'SELECT `id_equipo`, `nombre` FROM `EQUIPOS` WHERE `id_club` = ' .
        $id_club .
        ' ORDER BY `nombre`';

    $result = $GLOBALS['conexion']->query($query);
    $arrayEquipos = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $arrayEquipos[] = $row;
    }

    return $arrayEquipos;
}

function getPartidos()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];

    $query =
        'SELECT `id_partido`, `local`, p.`estadio`, p.`minutos_partido`, `minuto_actual`, `nombre_rival`, `escudo_rival`, `fecha_hora`, `goles_local`, `goles_visitante`, `resultado`, e.`nombre`, `escudo` FROM `PARTIDOS` p  LEFT JOIN `EQUIPOS` `e` on e.`id_equipo` = p.`id_equipo` LEFT JOIN `CLUBES` `c` on c.`id_club` = e.`id_club` WHERE p.`id_equipo` = ' .
        $id_equipo .
        ' ORDER BY `fecha_hora` DESC';

    $result = $GLOBALS['conexion']->query($query);

    $arrayPartido = [];
    $returnArray = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $arrayPartido['id_partido'] = $row['id_partido'];
        $arrayPartido['local'] = $row['local'];
        $arrayPartido['estadio'] = $row['estadio'];
        $arrayPartido['minutos_partido'] = $row['minutos_partido'];
        $arrayPartido['minuto_actual'] = $row['minuto_actual'];
        $arrayPartido['nombre_rival'] = strtoupper($row['nombre_rival']);
        $arrayPartido['escudo_rival'] = $row['escudo_rival'];
        $arrayPartido['fecha_hora'] = $row['fecha_hora'];
        $arrayPartido['goles_local'] = $row['goles_local'];
        $arrayPartido['goles_visitante'] = $row['goles_visitante'];
        $arrayPartido['resultado'] = $row['resultado'];
        $arrayPartido['nombre'] = $row['nombre'];
        $arrayPartido['escudo'] = $row['escudo'];

        $returnArray[] = $arrayPartido;
    }

    echo json_encode($returnArray);
}

function getJugadores()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];

    $query =
        'SELECT * FROM `JUGADORES` WHERE `id_equipo` = ' .
        $id_equipo .
        '  ORDER BY `dorsal` ASC';

    $result = $GLOBALS['conexion']->query($query);

    $arrayJugador = [];
    $returnArray = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $arrayJugador['id_jugador'] = $row['id_jugador'];
        $arrayJugador['nombre'] = $row['nombre'];
        $arrayJugador['dorsal'] = $row['dorsal'];
        $arrayJugador['foto'] = $row['foto'];

        $returnArray[] = $arrayJugador;
    }

    echo json_encode($returnArray);
}

function updateMinutoActual()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];
    $minuto_actual = $decodedData['minuto_actual'];

    $query =
        'UPDATE `PARTIDOS` SET `minuto_actual` = ' .
        $minuto_actual .
        ' WHERE `PARTIDOS`.`id_partido` = ' .
        $id_partido;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Minuto actualizado.';
    } else {
        $mensaje = 'Error al actualizar el minuto.';
    }

    echo $mensaje;
}

function gol()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];
    $local = $decodedData['local'];
    $suma = $decodedData['suma'];

    $query = '';

    if ($local) {
        if ($suma) {
            $query =
                'UPDATE `PARTIDOS` SET `goles_local` = `goles_local` + 1 WHERE `PARTIDOS`.`id_partido` = ' .
                $id_partido;
        } else {
            $query =
                'UPDATE `PARTIDOS` SET `goles_local` = `goles_local` - 1 WHERE `PARTIDOS`.`id_partido` = ' .
                $id_partido;
        }
    } else {
        if ($suma) {
            $query =
                'UPDATE `PARTIDOS` SET `goles_visitante` = `goles_visitante` + 1 WHERE `PARTIDOS`.`id_partido` = ' .
                $id_partido;
        } else {
            $query =
                'UPDATE `PARTIDOS` SET `goles_visitante` = `goles_visitante` - 1 WHERE `PARTIDOS`.`id_partido` = ' .
                $id_partido;
        }
    }

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        if ($suma) {
            $mensaje = 'Gol añadido.';
        } else {
            $mensaje = 'Gol quitado';
        }
    } else {
        $mensaje = 'Error al añadir gol.';
    }

    echo $mensaje;
}

function cambiarResultado()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];
    $resultado = $decodedData['resultado'];

    $query =
        "UPDATE `PARTIDOS` SET `resultado` = '" .
        $resultado .
        "' WHERE `id_partido` = " .
        $id_partido;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Resultado cambiado.';
    } else {
        $mensaje = 'Error al actualizar el resultado.';
    }

    echo $mensaje;
}

function getClubes()
{
    $query =
        'SELECT `id_club`, `nombre`, `escudo` FROM `CLUBES` ORDER BY `nombre`';

    $result = $GLOBALS['conexion']->query($query);
    $returnArray = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $returnArray[] = $row;
    }

    echo json_encode($returnArray);
}

function getNarraciones()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];

    $query =
        'SELECT `comentario`, `minuto`, `icono` from `NARRACIONES` LEFT JOIN ELEMENTOS_NARRACION on NARRACIONES.id_tipo = ELEMENTOS_NARRACION.id_tipo WHERE id_partido = ' .
        $id_partido .
        ' ORDER BY minuto DESC, id_narracion DESC';

    $result = $GLOBALS['conexion']->query($query);
    $returnArray = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $returnArray[] = $row;
    }

    echo json_encode($returnArray);
}

function actualizarNarracion()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_partido = $decodedData['id_partido'];

    $query =
        'SELECT minuto_actual, goles_local, goles_visitante FROM PARTIDOS WHERE id_partido = ' .
        $id_partido;
    $result = $GLOBALS['conexion']->query($query);

    while ($row = mysqli_fetch_assoc($result)) {
        $returnArray = $row;
    }

    echo json_encode($returnArray);
}

function getNombreEquipo()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];

    $query =
        'SELECT EQUIPOS.nombre as nombreEquipo, CLUBES.nombre as nombreClub FROM `EQUIPOS` LEFT JOIN CLUBES on EQUIPOS.id_club = CLUBES.id_club WHERE id_equipo = ' .
        $id_equipo;

    $result = $GLOBALS['conexion']->query($query);

    while ($row = mysqli_fetch_assoc($result)) {
        $returnArray = $row;
    }

    echo json_encode($returnArray);
}

function cambiosClub()
{
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    $id_equipo = $decodedData['id_equipo'];
    $nombre = $decodedData['nombre'];
    $estadio = $decodedData['estadio'];
    $minutos_partido = $decodedData['minutos_partido'];

    $query =
        "UPDATE `EQUIPOS` SET `nombre` = '" .
        $nombre .
        "',  `estadio` = '" .
        $estadio .
        "', `minutos_partido` = " .
        $minutos_partido .
        '  WHERE `id_equipo` = ' .
        $id_equipo;

    $resultado = mysqli_query($GLOBALS['conexion'], $query);

    if ($resultado) {
        $mensaje = 'Equipo actualizado.';
    } else {
        $mensaje = 'Error al actualizar el equipo.';
    }

    echo $mensaje;
}
?> 