const express = require('express')
const mysql = require("mysql")
const app = express()

app.use(express.json())

const connect = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    // password:"",
    database:"school"
})

        //ELEVES
app.get('/eleve/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/eleve/getAll
    connect.query('SELECT * FROM Eleves', (errors, data) => { //requête SQL pour récupérer les données de la table games
      if (errors) {
        console.error(errors);
      } else {
        res.json(data);
      }
    });
  });

    //CREATE ELEVES
  app.post("/eleve/create",(req, res)=>{
    connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?',req.body.idClasse,(errors,results) =>{
        if (errors) throw errors;

        if (results.length === 0){
            console.log("La Classe n'existe pas rentrer la classe avant l eleve");
            res.send("La Classe n'existe pas rentrer la classe avant l eleve");
            return;
        }

        connect.query('INSERT INTO Eleves SET ?',req.body,(errors, results) => {
            if(errors)throw errors;
            console.log(results);
            connect.query('SELECT * FROM Eleves', (errors,results)=>{
                if(errors)throw errors;
                res.json(results);
            });
        });

    });

  });


    //READ ELEVES PAR ID
    app.get('/eleve/read/:id', (req, res) => {
        const eleveId = req.params.id;
          
        connect.query('SELECT * FROM Eleves WHERE idEleves = ?', eleveId, (errors, data) => {
            if (errors) throw errors;
             res.send(data);
        });
    });


    //READ ELEVES PAR NOM
    app.get('/eleve/readnom/:nom', (req, res) => {
        const nomEleve = req.params.nom;
          
        connect.query('SELECT * FROM Eleves WHERE nomEleve = ?', nomEleve, (errors, data) => {
            if (errors) throw errors;
              res.send(data);
        });
    });


    //UPDATE Eleves
    app.post('/eleve/update',(req,res) => {
        connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?',req.body.idClasse,(errors,results) =>{
            if (errors) throw errors;
    
            if (results.length === 0){
                console.log("La Classe n'existe pas rentrer la classe avant l eleve");
                res.send("La Classe n'existe pas rentrer la classe avant l eleve");
                return;
            }
            connect.query('SELECT idEleves FROM Eleves WHERE idEleves = ?',req.body.idEleves,(errors,results) =>{
                if (errors) throw errors;
        
                if (results.length === 0){
                    console.log("L eleve n'existe pas dans la base de donées");
                    res.send("L eleve n'existe pas dans la base de donées");
                    return;
                }

                connect.query("UPDATE Eleves SET ? WHERE idEleves = ?",[req.body,req.body.idEleves],(errors,data) =>{
                    if (errors) throw errors;
                    console.log(data);
                    connect.query("SELECT * FROM Eleves",(errors,data)=>{
                        if(errors)throw errors;
                        res.json(data)
                    })
                })
            })
        })
    })

        //DELETE
    app.post('/eleve/delete', (req, res) => { 
        // connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?', req.body.idClasse, (errors, data) => {
        //     if (errors) throw errors;
    
        //     if (data.length > 0) {
        //         console.log("L eleve est associé à une classe et ne peut pas être supprimé.");
        //         res.send("L eleve est associé à une classe et ne peut pas être supprimé.");
        //         return;
        //     }


            connect.query('SELECT idEleves FROM Eleves WHERE idEleves = ?', req.body.idEleves, (errors, data) => {
                if (errors) throw errors;
        
                if (data.length === 0) {
                    console.log("L eleve n'existe pas dans la base de données.");
                    return;
                }
        
                connect.query('DELETE FROM Eleves WHERE idEleves = ?', req.body.idEleves, (errors, data) => {
                    if (errors) throw errors;
                    console.log(data);
                    connect.query('SELECT * FROM Eleves', (errors, data) => {
                        if (errors) throw errors;
                        res.json(data);
                    });
                });
            });
        });
    // });



        //CLASSES

    app.get('/classe/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/classe/getAll
        connect.query('SELECT * FROM Classes', (errors, data) => { //requête SQL pour récupérer les données de la table games
          if (errors) {
            console.error(errors);
          } else {
            res.json(data);
          }
        });
      });
    
        //CREATE CLASSE
      app.post("/classe/create",(req, res)=>{
    
            connect.query('INSERT INTO Classes SET ?',req.body,(errors, results) => {
                if(errors)throw errors;
                console.log(results);
                connect.query('SELECT * FROM Classes', (errors,results)=>{
                    if(errors)throw errors;
                    res.json(results);
                });
            });
    
        });

        //READ CLASSES PAR ID
        app.get('/classe/read/:id', (req, res) => {
            const classeId = req.params.id;
              
            connect.query('SELECT * FROM Classes WHERE idClasse = ?', classeId, (errors, data) => {
                if (errors) throw errors;
                 res.send(data);
            });
        });
    
    
        //READ CLASSES PAR NOM
        app.get('/classe/readnom/:nom', (req, res) => {
            const nomClasse = req.params.nom;
              
            connect.query('SELECT * FROM Classes WHERE nomClasse = ?', nomClasse, (errors, data) => {
                if (errors) throw errors;
                  res.send(data);
            });
        });
        

            //UPDATE Classes
    app.post('/classe/update',(req,res) => {
            connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?',req.body.idClasse,(errors,results) =>{
                if (errors) throw errors;
        
                if (results.length === 0){
                    console.log("La classe n'existe pas dans la base de donées");
                    res.send("La classe n'existe pas dans la base de donées");
                    return;
                }

                connect.query("UPDATE Classes SET ? WHERE idClasse = ?",[req.body,req.body.idClasse],(errors,data) =>{
                    if (errors) throw errors;
                    console.log(data);
                    connect.query("SELECT * FROM Classes",(errors,data)=>{
                        if(errors)throw errors;
                        res.json(data)
                    })
                })
            })
        })


                //DELETE
    app.post('/classe/delete', (req, res) => { 



            connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?', req.body.idClasse, (errors, data) => {
                if (errors) throw errors;
        
                if (data.length === 0) {
                    console.log("La classe n'existe pas dans la base de données.");
                    return;
                }
        
                connect.query('DELETE FROM Classes WHERE idClasse = ?', req.body.idClasse, (errors, data) => {
                    if (errors) throw errors;
                    console.log(data);
                    connect.query('SELECT * FROM Classes', (errors, data) => {
                        if (errors) throw errors;
                        res.json(data);
                    });
                });
            });
        });




        //SALLES
        
    app.get('/salle/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/salle/getAll
        connect.query('SELECT * FROM Salle', (errors, data) => { //requête SQL pour récupérer les données de la table games
          if (errors) {
            console.error(errors);
          } else {
            res.json(data);
          }
        });
      });
    
        //CREATE SALLE
      app.post("/salle/create",(req, res)=>{
    
            connect.query('INSERT INTO Salle SET ?',req.body,(errors, results) => {
                if(errors)throw errors;
                console.log(results);
                connect.query('SELECT * FROM Salle', (errors,results)=>{
                    if(errors)throw errors;
                    res.json(results);
                });
            });
    
        });

        //READ SALLE PAR ID
        app.get('/salle/read/:id', (req, res) => {
            const salleId = req.params.id;
              
            connect.query('SELECT * FROM Salle WHERE idSalle = ?', salleId, (errors, data) => {
                if (errors) throw errors;
                 res.send(data);
            });
        });
    
    
        //READ SALLE PAR NOM
        app.get('/salle/readnom/:nom', (req, res) => {
            const nomSalle = req.params.nom;
              
            connect.query('SELECT * FROM Salle WHERE nomSalle = ?', nomSalle, (errors, data) => {
                if (errors) throw errors;
                  res.send(data);
            });
        });
        

            //UPDATE Salle
    app.post('/salle/update',(req,res) => {
            connect.query('SELECT idSalle FROM Salle WHERE idSalle = ?',req.body.idSalle,(errors,results) =>{
                if (errors) throw errors;
        
                if (results.length === 0){
                    console.log("La Salle n'existe pas dans la base de donées");
                    res.send("La Salle n'existe pas dans la base de donées");
                    return;
                }

                connect.query("UPDATE Salle SET ? WHERE idSalle = ?",[req.body,req.body.idSalle],(errors,data) =>{
                    if (errors) throw errors;
                    console.log(data);
                    connect.query("SELECT * FROM Salle",(errors,data)=>{
                        if(errors)throw errors;
                        res.json(data)
                    })
                })
            })
        })


                //DELETE
    app.post('/Salle/delete', (req, res) => { 



            connect.query('SELECT idSalle FROM Salle WHERE idSalle = ?', req.body.idSalle, (errors, data) => {
                if (errors) throw errors;
        
                if (data.length === 0) {
                    console.log("La Salle n'existe pas dans la base de données.");
                    return;
                }
        
                connect.query('DELETE FROM Salle WHERE idSalle = ?', req.body.idSalle, (errors, data) => {
                    if (errors) throw errors;
                    console.log(data);
                    connect.query('SELECT * FROM Salle', (errors, data) => {
                        if (errors) throw errors;
                        res.json(data);
                    });
                });
            });
        });

        //PROFS

        app.get('/prof/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/prof/getAll
            connect.query('SELECT * FROM Profs', (errors, data) => { //requête SQL pour récupérer les données de la table games
              if (errors) {
                console.error(errors);
              } else {
                res.json(data);
              }
            });
          });
        
            //CREATE PROF
          app.post("/prof/create",(req, res)=>{
        
                connect.query('INSERT INTO Profs SET ?',req.body,(errors, results) => {
                    if(errors)throw errors;
                    console.log(results);
                    connect.query('SELECT * FROM Profs', (errors,results)=>{
                        if(errors)throw errors;
                        res.json(results);
                    });
                });
        
            });
    
            //READ PROF PAR ID
            app.get('/prof/read/:id', (req, res) => {
                const profId = req.params.id;
                  
                connect.query('SELECT * FROM Profs WHERE idProf = ?', profId, (errors, data) => {
                    if (errors) throw errors;
                     res.send(data);
                });
            });
        
        
            //READ PROF PAR NOM
            app.get('/prof/readnom/:nom', (req, res) => {
                const nomProf = req.params.nom;
                  
                connect.query('SELECT * FROM Profs WHERE nomProf = ?', nomProf, (errors, data) => {
                    if (errors) throw errors;
                      res.send(data);
                });
            });
            
    
                //UPDATE PROF
        app.post('/prof/update',(req,res) => {
                connect.query('SELECT idProf FROM Profs WHERE idProf = ?',req.body.idProf,(errors,results) =>{
                    if (errors) throw errors;
            
                    if (results.length === 0){
                        console.log("Le prof n'existe pas dans la base de donées");
                        res.send("Le prof n'existe pas dans la base de donées");
                        return;
                    }
    
                    connect.query("UPDATE Profs SET ? WHERE idProf = ?",[req.body,req.body.idProf],(errors,data) =>{
                        if (errors) throw errors;
                        console.log(data);
                        connect.query("SELECT * FROM Profs",(errors,data)=>{
                            if(errors)throw errors;
                            res.json(data)
                        })
                    })
                })
            })
    
    
                    //DELETE
        app.post('/prof/delete', (req, res) => { 
    
    
    
                connect.query('SELECT idProf FROM Profs WHERE idProf = ?', req.body.idProf, (errors, data) => {
                    if (errors) throw errors;
            
                    if (data.length === 0) {
                        console.log("Le prof n'existe pas dans la base de données.");
                        return;
                    }
            
                    connect.query('DELETE FROM Profs WHERE idProf = ?', req.body.idProf, (errors, data) => {
                        if (errors) throw errors;
                        console.log(data);
                        connect.query('SELECT * FROM Prof', (errors, data) => {
                            if (errors) throw errors;
                            res.json(data);
                        });
                    });
                });
            });

            //MATIERE

            app.get('/matiere/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/matiere/getAll
                connect.query('SELECT * FROM Matieres', (errors, data) => { //requête SQL pour récupérer les données de la table matiere
                  if (errors) {
                    console.error(errors);
                  } else {
                    res.json(data);
                  }
                });
              });
            
                //CREATE MATIERES
              app.post("/matiere/create",(req, res)=>{
                connect.query('SELECT idProf FROM Profs WHERE idProf = ?',req.body.idProf,(errors,results) =>{
                    if (errors) throw errors;
            
                    if (results.length === 0){
                        console.log("Le prof de la matiere n'existe pas rentrer le prof avant la matiere");
                        res.send("Le prof de la matiere n'existe pas rentrer le prof avant la matiere");
                        return;
                    }
                    connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("La Matiere n'existe pas rentrer la classe avant l eleve");
                            res.send("La Matiere n'existe pas rentrer la classe avant l eleve");
                            return;
                        }
                
                        connect.query('INSERT INTO Matieres SET ?',req.body,(errors, results) => {
                            if(errors)throw errors;
                            console.log(results);
                            connect.query('SELECT * FROM Matieres', (errors,results)=>{
                                if(errors)throw errors;
                                res.json(results);
                            });
                        });
                
                    });
                });
            
              });
            
            
                //READ Matiere PAR ID
                app.get('/matiere/read/:id', (req, res) => {
                    const Id = req.params.id;
                      
                    connect.query('SELECT * FROM Matieres WHERE idMatiere = ?', Id, (errors, data) => {
                        if (errors) throw errors;
                         res.send(data);
                    });
                });
            
            
                //READ Matiere PAR NOM
                app.get('/matiere/readnom/:nom', (req, res) => {
                    const nom = req.params.nom;
                      
                    connect.query('SELECT * FROM Matieres WHERE nomMatiere = ?', nom, (errors, data) => {
                        if (errors) throw errors;
                          res.send(data);
                    });
                });
            
            
                //UPDATE Matiere
                app.post('/matiere/update',(req,res) => {
                    connect.query('SELECT idProf FROM Profs WHERE idProf = ?',req.body.idProf,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("Le prof n'existe pas rentrer le prof avant la matiere");
                            res.send("Le prof n'existe pas rentrer le prof avant la matiere");
                            return;
                        }
                        connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                            if (errors) throw errors;
                    
                            if (results.length === 0){
                                console.log("La matiere n'existe pas dans la base de donées");
                                res.send("La matiere n'existe pas dans la base de donées");
                                return;
                            }
            
                            connect.query("UPDATE Matieres SET ? WHERE idMatiere = ?",[req.body,req.body.idMatiere],(errors,data) =>{
                                if (errors) throw errors;
                                console.log(data);
                                connect.query("SELECT * FROM Matieres",(errors,data)=>{
                                    if(errors)throw errors;
                                    res.json(data)
                                })
                            })
                        })
                    })
                })
            
                    //DELETE
                app.post('/matiere/delete', (req, res) => { 
                        connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?', req.body.idMatiere, (errors, data) => {
                            if (errors) throw errors;
                    
                            if (data.length === 0) {
                                console.log("La matiere n'existe pas dans la base de données.");
                                return;
                            }
                    
                            connect.query('DELETE FROM Matieres WHERE idMatiere = ?', req.body.idMatiere, (errors, data) => {
                                if (errors) throw errors;
                                console.log(data);
                                connect.query('SELECT * FROM Matieres', (errors, data) => {
                                    if (errors) throw errors;
                                    res.json(data);
                                });
                            });
                        });
                    });



            //NOTES

            app.get('/note/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/note/getAll
            connect.query('SELECT * FROM Notes', (errors, data) => { //requête SQL pour récupérer les données de la table matiere
                if (errors) {
                console.error(errors);
                } else {
                res.json(data);
                }
            });
            });
        
            //CREATE NOTES
            app.post("/note/create",(req, res)=>{
            connect.query('SELECT idEleves FROM Eleves WHERE idEleves = ?',req.body.idEleve,(errors,results) =>{
                if (errors) throw errors;
        
                if (results.length === 0){
                    console.log("L eleve n'existe pas rentrer l eleve avant la note");
                    res.send("L eleve n'existe pas rentrer l eleve avant la note");
                    return;
                }
                connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                    if (errors) throw errors;
            
                    if (results.length === 0){
                        console.log("La Matiere n'existe pas rentrer la matiere avant la note");
                        res.send("La Matiere n'existe pas rentrer la matiere avant la note");
                        return;
                    }
            
                    connect.query('INSERT INTO Notes SET ?',req.body,(errors, results) => {
                        if(errors)throw errors;
                        console.log(results);
                        connect.query('SELECT * FROM Notes', (errors,results)=>{
                            if(errors)throw errors;
                            res.json(results);
                        });
                    });
            
                });
            });
        
            });
        
        
            //READ Note PAR ID
            app.get('/note/read/:id', (req, res) => {
                const Id = req.params.id;
                    
                connect.query('SELECT * FROM Notes WHERE idNote = ?', Id, (errors, data) => {
                    if (errors) throw errors;
                        res.send(data);
                });
            });
        
        
            //READ Note PAR NOM Eleve
            app.get('/note/readnomeleve/:nom', (req, res) => {
                const nom = req.params.nom;
              
                connect.query('SELECT * FROM Notes INNER JOIN Eleves ON Notes.idEleve = Eleves.idEleves WHERE Eleves.nomEleve = ?', nom, (errors, data) => {
                  if (errors) throw errors;
                  res.send(data);
                });
              });
              
        
        
            //UPDATE NOte
            app.post('/note/update',(req,res) => {
                connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                    if (errors) throw errors;
            
                    if (results.length === 0){
                        console.log("La matiere n'existe pas rentrer la matiere avant la note");
                        res.send("La matiere n'existe pas rentrer la matiere avant la note");
                        return;
                    }
                    connect.query('SELECT idEleves FROM Eleves WHERE idEleves = ?',req.body.idEleve,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("L eleve n'existe pas rentrer l eleve avant la note");
                            res.send("L eleve n'existe pas rentrer l eleve avant la note");
                            return;
                        }
                    connect.query('SELECT idNote FROM Notes WHERE idNote = ?',req.body.idNote,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("La note n'existe pas dans la base de donées");
                            res.send("La note n'existe pas dans la base de donées");
                            return;
                        }
        
                        connect.query("UPDATE Notes SET ? WHERE idNote = ?",[req.body,req.body.idNote],(errors,data) =>{
                            if (errors) throw errors;
                            console.log(data);
                            connect.query("SELECT * FROM Notes",(errors,data)=>{
                                if(errors)throw errors;
                                res.json(data)
                            })
                        })
                    })
                })
            })
            })
        
                //DELETE
            app.post('/note/delete', (req, res) => { 
                    connect.query('SELECT idNote FROM Notes WHERE idNote = ?', req.body.idNote, (errors, data) => {
                        if (errors) throw errors;
                
                        if (data.length === 0) {
                            console.log("La Note n'existe pas dans la base de données.");
                            return;
                        }
                
                        connect.query('DELETE FROM Notes WHERE idNote = ?', req.body.idNote, (errors, data) => {
                            if (errors) throw errors;
                            console.log(data);
                            connect.query('SELECT * FROM Notes', (errors, data) => {
                                if (errors) throw errors;
                                res.json(data);
                            });
                        });
                    });
                });



              //COURS

              app.get('/cour/getAll', (req, res) => { // print données sur l'URL 127.0.0.1:3000/cour/getAll
                connect.query('SELECT * FROM Cours', (errors, data) => { //requête SQL pour récupérer les données de la table cours
                    if (errors) {
                    console.error(errors);
                    } else {
                    res.json(data);
                    }
                });
                });
            
                //CREATE COURS
                app.post("/cour/create",(req, res)=>{
                connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                    if (errors) throw errors;
            
                    if (results.length === 0){
                        console.log("La matiere n'existe pas rentrer la matiere avant le cour");
                        res.send("La matiere n'existe pas rentrer la matiere avant le cour");
                        return;
                    }
                    connect.query('SELECT idSalle FROM Salle WHERE idSalle = ?',req.body.idSalle,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("La salle n'existe pas rentrer la salle avant le cour");
                            res.send("La salle n'existe pas rentrer la salle avant le cour");
                            return;
                        }
                        connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?',req.body.idClasse,(errors,results) =>{
                            if (errors) throw errors;
                    
                            if (results.length === 0){
                                console.log("La Classe n'existe pas rentrer la Classe avant le cour");
                                res.send("La Classe n'existe pas rentrer la Classe avant le cour");
                                return;
                            }
                
                            connect.query('INSERT INTO Cours SET ?',req.body,(errors, results) => {
                                if(errors)throw errors;
                                console.log(results);
                                connect.query('SELECT * FROM Cours', (errors,results)=>{
                                    if(errors)throw errors;
                                    res.json(results);
                                });
                            });
                
                        });
                    });
                });
            
                });
            
            
                //READ COURS PAR ID
                app.get('/cour/read/:id', (req, res) => {
                    const Id = req.params.id;
                        
                    connect.query('SELECT * FROM Cours WHERE idCour = ?', Id, (errors, data) => {
                        if (errors) throw errors;
                            res.send(data);
                    });
                });


                //READ COURS PAR date
                app.get('/cour/readdate/:date', (req, res) => {
                    const date = req.params.date;
                        
                    connect.query('SELECT * FROM Cours WHERE date = ?', date, (errors, data) => {
                        if (errors) throw errors;
                            res.send(data);
                    });
                });
            
            
                //READ Cours PAR Matiere
                app.get('/cour/readmatiere/:nom', (req, res) => {
                    const nom = req.params.nom;
                  
                    connect.query('SELECT * FROM Cours INNER JOIN Matieres ON Cours.idMatiere = Matieres.idMatiere WHERE Matieres.nomMatiere = ?', nom, (errors, data) => {
                      if (errors) throw errors;
                      res.send(data);
                    });
                  });


                //READ Cours PAR Salle
                app.get('/cour/readsalle/:nom', (req, res) => {
                    const nom = req.params.nom;
                  
                    connect.query('SELECT * FROM Cours INNER JOIN Salle ON Cours.idSalle = Salle.idSalle WHERE Salle.nomSalle = ?', nom, (errors, data) => {
                      if (errors) throw errors;
                      res.send(data);
                    });
                  });


                  //READ Cours PAR Classe
                app.get('/cour/readclasse/:nom/:grp', (req, res) => {
                    const nom = req.params.nom;
                    const groupe = req.params.grp;
                  
                    connect.query('SELECT * FROM Cours INNER JOIN Classes ON Cours.idClasse = Classes.idClasse WHERE Classes.nomClasse = ? AND Classes.groupe = ? ', [nom,groupe], (errors, data) => {
                      if (errors) throw errors;
                      res.send(data);
                    });
                  });
                  
            
            
                //UPDATE COURS
                app.post('/cour/update',(req,res) => {
                    connect.query('SELECT idMatiere FROM Matieres WHERE idMatiere = ?',req.body.idMatiere,(errors,results) =>{
                        if (errors) throw errors;
                
                        if (results.length === 0){
                            console.log("La matiere n'existe pas rentrer la matiere avant le cour");
                            res.send("La matiere n'existe pas rentrer la matiere avant le cour");
                            return;
                        }
                        connect.query('SELECT idSalle FROM Salle WHERE idSalle = ?',req.body.idSalle,(errors,results) =>{
                            if (errors) throw errors;
                    
                            if (results.length === 0){
                                console.log("La salle n'existe pas rentrer la salle avant le cour");
                                res.send("La salle n'existe pas rentrer la salle avant le cour");
                                return;
                            }
                            connect.query('SELECT idClasse FROM Classes WHERE idClasse = ?',req.body.idClasse,(errors,results) =>{
                                if (errors) throw errors;
                        
                                if (results.length === 0){
                                    console.log("La Classe n'existe pas rentrer la Classe avant le cour");
                                    res.send("La Classe n'existe pas rentrer la Classe avant le cour");
                                    return;
                                }
                                connect.query('SELECT idCour FROM Cours WHERE idCour = ?',req.body.idCour,(errors,results) =>{
                                    if (errors) throw errors;
                            
                                    if (results.length === 0){
                                        console.log("Le cour n'existe pas dans la base de donées");
                                        res.send("Le cour n'existe pas dans la base de donées");
                                        return;
                                    }
            
                                    connect.query("UPDATE Cours SET ? WHERE idCour = ?",[req.body,req.body.idNote],(errors,data) =>{
                                        if (errors) throw errors;
                                        console.log(data);
                                        connect.query("SELECT * FROM Cours",(errors,data)=>{
                                            if(errors)throw errors;
                                            res.json(data)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            
                    //DELETE
                app.post('/cour/delete', (req, res) => { 
                        connect.query('SELECT idCour FROM Cours WHERE idCour = ?', req.body.idNote, (errors, data) => {
                            if (errors) throw errors;
                    
                            if (data.length === 0) {
                                console.log("Le cour n'existe pas dans la base de données.");
                                return;
                            }
                    
                            connect.query('DELETE FROM Cours WHERE idCour = ?', req.body.idNote, (errors, data) => {
                                if (errors) throw errors;
                                console.log(data);
                                connect.query('SELECT * FROM Cours', (errors, data) => {
                                    if (errors) throw errors;
                                    res.json(data);
                                });
                            });
                        });
                    });




  app.listen(3000)