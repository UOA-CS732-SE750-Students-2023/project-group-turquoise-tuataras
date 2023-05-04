const [recipes, setRecipes] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [fetchResults, setFetchResults] = useState({});

//Handle Fetch by button

useEffect(() => {
  if (fetchResults){    
  setRecipes(fetchResults);
}
}, [fetchResults]);

const handleFetchRecipe = async () => {

try {
    const response = await axios.get(`http://localhost:3000/api/recipes`)
    setFetchResults(response.data);
    console.log(response.data);
    } catch (err) {
    console.error(err);
    }

};

handleFetchRecipe();


