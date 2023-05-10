
const {user, loading} = useAuthContext();
const mealPlanUrl = 'http://localhost:3000/api/meal-plan/';

const [testData, setTestData] = useState(new Map());
    useEffect(() => {
        try {
            axios.get(mealPlanUrl, {
                headers: {
                    Authorization: Bearer ${user.token}
                }
            })
                .then(response => {
                    let arrayData = response.data;
                    let recipeMap = new Map();
                    arrayData.forEach(item=>{
                        let recipes = item.recipe;
                        recipes.forEach(item=>{
                            if(!recipeMap.has(item._id)){
                                recipeMap.set(item._id,item);
                            }
                        })
                    });
                    setTestData(recipeMap);
                    // console.log(recipeMap);
                });
        } catch (err) {
            console.error(err);
        }
    }, []);
