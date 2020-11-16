/*const dataSet = ["1 09:42-11:00",
  "4 12:06-12:36",
  "2 17:52-17:58",
  "1 14:50-15:14",
  "1 08:00-17:59",
  "2 08:00-12:28",
  "2 17:16-17:41",
  "1 08:10-13:01",
  "2 13:29-17:59",
  "5 17:55-17:56",
  "4 08:00-17:59",
  "3 13:00-13:38",
  "2 10:38-10:59",
  "5 08:00-17:59",
  "5 16:27-17:34",
  "3 08:00-17:59"];*/
/*const input= ["2 09:30-12:00", "1 09:00-13:00","1 09:30-15:00"];*/

function findCreneau(input) {
  
  let creneaux = [[], [], [], [], [], ];
  let result;
  const  end = "17:59";
  //console.log("creneau avant toute modif",creneaux)
  // on ordonne par ordre de jour
  for(let cpt=0 ; cpt < input.length; cpt++){
    //- 1 pour les mettre a la bonne case
    //console.log("que vaux creneau avant?", creneaux)
    //console.log("je vais push dans le tableau ",input[cpt], "a la position",  input[cpt][0]-1, "donc dans la liste", creneaux[input[cpt][0]-1])
    creneaux[input[cpt][0]-1].push(input[cpt])
  }
  //console.log("creneaux par jour", creneaux)

  // une fois les creneau trier par jour, on va les trier par heure de debut
  for(let cpt=0 ; cpt < creneaux.length; cpt++){
    //- 1 pour les mettre a la bonne case
    if (creneaux[cpt].length > 0){
      creneaux[cpt].sort(compareFunction)
      //console.log("creneaux par ordre de creneau", "cpt=", cpt,creneaux)
      //creneau trier, on va fusionner les creneaux horraires qui entrent en conflit pour creer moins de creneaux
      creneaux[cpt]= fusionCreneau(creneaux[cpt])
      //console.log("creneaux apres fusion", creneaux)

      // une fois les creneau propres, je cherche mainteant un espace de 60 mins en partant du debut 
      // premier cas, de 8:00 a debut premier creneau . 8h= 8*60 = 480
      const hinMins= creneaux[cpt][0].split("-")[0].split(" ")[1].split(":")[0] * 60 
      const mins = creneaux[cpt][0].split("-")[0].split(" ")[1].split(":")[1]
      //console.log(parseInt(mins))
      const total = hinMins + parseInt(mins)

      if  ( (total - 480)  >= 59) {
        //console.log("creneau trouver avec ", total )
        result = (cpt+1).toString() + " 08:00-08:59";
        return result;
      }
      // je cherche un creneau entre la fin des indisponiblites et le debut des suivantes
      //console.log("avant je passe",creneaux[cpt].length)
      for(let cpt2= 0; cpt2 < creneaux[cpt].length; cpt2++){
        // je check quand meme que il y ait un creneau suivant, et que la fin de creneau propser est avant 18h 
        //console.log("ca passe, il existe creneau apres", creneaux[cpt][cpt2+1])
        if  ( creneaux[cpt][cpt2+1] && ((creneaux[cpt][cpt2+1].split("-")[0].split(" ")[1].split(":")[0] * 60 + creneaux[cpt+1][0].split("-")[0].split(" ")[1].split(":")[1] )- (creneaux[cpt][cpt2].split("-")[1].split(":")[0] * 60 +  creneaux[cpt][cpt2].split("-")[1].split(":")[1] )) >= 59){
          // je dois rajouter 59 mins a mon heure de debut pour avoir l'heure de fin
          const endTime=ajoutMin(creneaux[cpt][cpt2].split("-")[1], 60)
          //console.log(endTime)
          if (endTime <= end){
            //console.log("found here")
            result = (cpt+1).toString() + " " + ajoutMin(creneaux[cpt][cpt2].split("-")[1],1) + "-" + endTime
            return result
          }
        
        
        } else {
          //console.log("je rentre dans le else")
          const endTime=ajoutMin(creneaux[cpt][cpt2].split("-")[1], 60)
          //console.log(endTime)
          if (endTime <= end){
            //console.log("fin de journee")
            result = (cpt+1).toString() + " " + ajoutMin(creneaux[cpt][cpt2].split("-")[1],1) + "-" + endTime
            return result
          }
        }
      };
    }
  }

  function ajoutMin(temps, extra){
    const heures= parseInt(temps.split(":")[0])
    const minutes= parseInt(temps.split(":")[1])
    const totalMinutes= heures*60 + minutes
    const ajout= totalMinutes + extra
    const finalHeures= String(Math.floor(ajout / 60)).padStart(2, '0')
    const finalMinutes= String(ajout % 60).padStart(2, '0')
    console.log(" a la base", temps,"ajout min", finalHeures +":" + finalMinutes)
    return (finalHeures +":" + finalMinutes)
  }
  function fusionCreneau(creneau){
    // je rajoute premier creneau
    let nouveauCreneau= [creneau[0]]
    for ( let cpt=1; cpt < creneau.length; cpt ++){
      // je compare la date de fin de mon creneau un avec le creneau de debut du suivant
      //console.log("here", nouveauCreneau[nouveauCreneau.length-1].split("-")[1] , creneau[cpt].split("-")[0].split(" ")[1])
      if (nouveauCreneau[nouveauCreneau.length-1].split("-")[1] >=  creneau[cpt].split("-")[0].split(" ")[1]){
        // je modifie dont le creneau, qui aura comme debut la meme chose, mais qui aura comme fin le max entre les deux creneau comparees ulterieurements
        const max=  nouveauCreneau[nouveauCreneau.length-1].split("-")[1] > creneau[cpt].split("-")[1] ? nouveauCreneau[nouveauCreneau.length-1].split("-")[1] : creneau[cpt].split("-")[1]
        //console.log("my max", max)
        // je remplace le creneau dans mon tableau
        nouveauCreneau[nouveauCreneau.length-1]=nouveauCreneau[nouveauCreneau.length-1].split("-")[0] + "-" + max
      // ma date pose pas de probleme alors je l'ajoute au tableau
      }else {
        nouveauCreneau.push(creneau[cpt])
      }
    }
    return nouveauCreneau;
  }
  ////console.log(creneaux)
  //fonction qui compare les creneau et qui va les trier en fonctions de l'horaire du debut
  function compareFunction(a , b){
    if (a.split("-")[0].split(":")[0].split(" ")[1] < b.split("-")[0].split(":")[0].split(" ")[1]){
      //console.log(a.split("-")[0].split(":")[0].split(" ")[1] , "est inferieur a ", b.split("-")[0].split(":")[0].split(" ")[1])
      return -1;
    }
    if (a.split("-")[0].split(":")[0].split(" ")[1] > b.split("-")[0].split(":")[0].split(" ")[1]){
      return 1;
    }
    if (a.split("-")[0].split(":")[0].split(" ")[1] == b.split("-")[0].split(":")[0].split(" ")[1]){
      // comparaison de minutes
      if (a.split("-")[0].split(":")[1] <  b.split("-")[0].split(":")[1]) {
        return -1;
      }
      if (a.split("-")[0].split(":")[1] >  b.split("-")[0].split(":")[1]) {
        return 1;
      }
    }
    return 0;
  }
}
module.exports = findCreneau;