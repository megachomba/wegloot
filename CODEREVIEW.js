const data = [
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
 ];
 
 function getValues() {
    return data.reduce((acc, { value, label }) => {
       acc.push(value);
       return acc;
    }, []);
 }

 // ici on a une utilisation inutile du reduce est de push array, un simple map est plus simple a ecrire

 function getValues() {
    return data.map(({ value }) => value);
 }




 //-------------------------------------------------------------------------------------------------------------
 async function getIndexes() {
    return await fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json());
 }
 
 async function analyzeIndexes() {
    const indexes = await getIndexes().catch((_) => {
       throw new Error('Unable to fetch indexes')
    });
    return indexes;
 }

 // ici on a un mix de async / await avec des then, il faut utiliser soit l'un soit l'autre. exemple en async await
 // une seul function dans un bloc try catch, plus lisible et plus claire sur le fonctionnement

 async function getIndexes() {
     try{
        const indexes = await fetch('https://api.coingecko.com/api/v3/indexes');
        return indexes;

     } catch((_)){
        throw new Error('Unable to fetch indexes')
     }
 }









//----------------------------------------------------------------------------------------------------
 async function getFilledIndexes() {
    try {
       const filledIndexes = [];
       const indexes = await getIndexes();
       const status = await getStatus();
       const usersId = await getUsersId();
       
       for (let index of indexes) {
          if (index.status === status.filled && users.includes(index.userId)) {
             filledIndexes.push(index);
          }
       }
       return filledIndexes;
    } catch(_) {
       throw new Error ('Unable to get indexes');
    }
 }


 // pour celleci, on pourrais utiliser un promise.ALL car les promesses ne sont pas interdepandantes, peu importes qui fini d'abbord.
// par contre, pour la partie boucle, on pourrais remplacer par un map
async function getFilledIndexes() {
    try {
       const filledIndexes = [];
       const indexes = await getIndexes();
       const status = await getStatus();
       const usersId = await getUsersId();
       indexes.map(index => {
        if (index.status === status.filled && users.includes(index.userId)) {
            filledIndexes.push(index);
         }
       })
       return filledIndexes;
    } catch(_) {
       throw new Error ('Unable to get indexes');
    }
 }


//---------------------------------------------------------------------------------------------------------------

function Employee({ id }) {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [employee, setEmployee] = useState({});

   useEffect(() => {
      getEmployee(id)
         .then(employee => {
            setEmployee(employee);
            setLoading(false);
         })
         .catch((e) => {
            setError('Unable to fetch employee');
            setLoading(false);
         });
   }, [id]);

   if (error) {
      return <Error />;
   }

   if (loading) {
      return <Loading />;
   }

   return (
      <Table>
         <Row>
            <Cell>{employee.firstName}</Cell>
            <Cell>{employee.lastName}</Cell>
            <Cell>{employee.position}</Cell>
            <Cell>{employee.project}</Cell>
            <Cell>{employee.salary}</Cell>
            <Cell>{employee.yearHired}</Cell>
            <Cell>{employee.wololo}</Cell>
         </Row>
      </Table>
   );
}

// ici il faut faire attention dans le render, car il se peut que employee soit undefined / nil, donc il faut faire du
// conditional rendering  pour eviter de faire exploser le front. une option serait

return (
    { employee &&
    <Table>
       <Row>
          <Cell>{employee.firstName}</Cell>
          <Cell>{employee.lastName}</Cell>
          <Cell>{employee.position}</Cell>
          <Cell>{employee.project}</Cell>
          <Cell>{employee.salary}</Cell>
          <Cell>{employee.yearHired}</Cell>
          <Cell>{employee.wololo}</Cell>
       </Row>
    </Table>
    }
 );


//---------------------------------------------------------------------------------
function getSettings(user) {
    if (user) {
       const project = await getProject(user.id);
       if (project) {
          const settings = await getSettings(project.id);
          if (settings) {
             return settings;
          }
       }
    }
    return {};
 }

 // le seul gros problem que je vois c'est que la fonction utilisent des await sans
 // declarer celle-ci en async. de plus, il faut traiter les possibles erreur avec un try catch
 // throw

 async function getSettings(user) {
    try{
        if (user) {
            const project = await getProject(user.id);
            if (project) {
                const settings = await getSettings(project.id);
                if (settings) {
                    return settings;
                }
            }
        }
    }catch(e){
        // do something with the error
    }
    return {};
 }