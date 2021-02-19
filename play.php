<?php
    require_once "players.model.php";

    if(isset($_POST['name']))
        $name = trim($_POST['name']);
    
    
    elseif(isset($_GET['id'])){
        if(idExist($_GET['id']))
            $name = getName($_GET['id']);
        else{
            header('Location: index.php');
        }       
    } 
    // var_dump($name);

?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="images/jeu.ico"/>
        <title>jeu du serpent </title>
    </head>
    <body>
        <form method="post" action = "players.php">
            <input type="hidden" id="score" name="score" >
            <input type="hidden" id="namePlayer" name="namePlayer" value="<?=$name?>">
        </form>
        <!-- <div>
            <ul>
                <li>Utiliser les flèches pour diriger le serpent</li>
                <li>appuyer sur la barre d'espace pour mettre le jeu en pause</li>
            </ul>
        </div> -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="js/script.js"></script>
    </body>
</html>
