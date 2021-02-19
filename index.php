<?php
    require_once "players.model.php";
      
    connect();

    $allPlayers = allPlayers();
    $place = 1;
?>


<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="images/jeu.ico"/>
        <title>jeu du serpent </title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" >
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="drawResult">
            <form method="post" action="play.php" >
                <div class="form-group row">
                    <label class="col-sm-3 col-form-label" for="name">Nom :</label>
                    <input type="text" name="name" class="col-sm-7 form-control" required > 
                </div>
                <p><button type="submit" class="btn btn-danger btn-lg">Commencer</button></p>
            </form>
            <div>
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
            </div>
        </div>
    </body>
</html>
