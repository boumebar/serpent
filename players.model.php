<?php
    $pdo;
     connect();
    // Connexion a la BDD

    function connect()
    {
        global $pdo;

        /* Connexion � une base MySQL avec l'invocation de pilote */
        // $dsn = 'mysql:dbname=u522895457_serpent;host=localhost;charset=UTF8';
        // $user = 'u522895457_boumed';
        // $password = 'u522895457_boumed';
        
        $dsn = 'mysql:dbname=serpent;host=localhost;charset=UTF8';
        $user = 'root';
        $password = '';

        try {
            $pdo = new PDO($dsn, $user, $password);
        } catch (PDOException $e) {
            echo 'Connexion �chou�e : ' . $e->getMessage();
        }
        
    }
        
    function allPlayers(){
        global $pdo;

        $resp = $pdo->query("SELECT * 
                             FROM `players` 
                             ORDER BY `bestScore` DESC
                             LIMIT 5
                            ");

        return $resp->fetchAll();
    }

    function create($name,$score){
        
        global $pdo;

         // prepare la requete
         $req = $pdo->prepare("INSERT INTO `players`(`name`, `bestScore`, `dateBestScore`)
                               VALUES (:name,:score,now())" );

        // execute la requete
        $req->execute([
        ':name'         => $name,
        ':score'         => $score,
        ]);

        // return le dernier Id cree
        return $pdo->lastInsertId();
    }

    function update($name,$bestScore){
        global $pdo;

        $req = $pdo->prepare("UPDATE players
                              SET bestScore = :bestScore
                              WHERE name = :name ");

        $req->execute([
            ":name"         =>  $name,
            ":bestScore"    =>  $bestScore,
        ]);

    }

    function getName($id){
        global $pdo;

        // prepare la requete
        $req = $pdo->prepare("SELECT `name` 
                              FROM `players` 
                              WHERE id = :id" );

        // execute la requete
        $req->execute([
        ':id'         => $id,
        ]);

        $userName = $req->fetch();

       
        return $userName['name'];
    }

    function idExist($id){
        global $pdo;

        $array = $pdo->query("SELECT id
                            FROM `players`");

        $array2 = $array->fetchAll(PDO::FETCH_COLUMN);
        
        // var_dump($array2);
        // die();
        return in_array($id,$array2);

     }
    
