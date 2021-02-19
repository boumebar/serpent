
<?php
require "players.model.php";
connect();   

//  die(var_dump($_POST));
if (isset($_POST['namePlayer'])){
    // die(var_dump($_POST));
    $idPlayer = create(trim($_POST['namePlayer']),trim($_POST['score'])); 
}


$allPlayers = allPlayers();
$place = 1;


?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="images/jeu.ico"/>
        <title>Score</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" >
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="drawResult">
            <h2>Meilleurs scores</h2>
            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($allPlayers as $player){?>
                    <tr>
                    <th scope="row"><?=$place++?></th>
                    <td><?=$player['name']?></td>
                    <td><?=$player['bestScore']?></td>
                    </tr>
                    <?php }?>
                </tbody>
            </table>
            <p id="score">Votre score <span><?=$_POST['namePlayer']?></span> : <strong><?=$_POST['score']?></strong></p>
            <a href="play.php?id=<?=$idPlayer?>" id='rejouer' class="favorite styled">rejouer</a>
            <a href="index.php" class="favorite styled bckgreen">Changer de Joueur</a>
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" ></script>
        <script src="js/fonctions.js"></script>
    </body>
</html>







