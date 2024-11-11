import React, { useEffect, useState } from 'react';
import { View, 
        Text, 
        TextInput, 
        TouchableOpacity, 
        ScrollView, 
        ActivityIndicator, 
        RefreshControl } 
        from 'react-native';
import Food from './Food';
const App = () => {
    const APP_ID = 'YOUR OWN API ID';
    const APP_KEY = 'YOUR OWN API Key';
    const [food_r, setfood_r] = useState([]);
    const [search_food, setSearch_food] = useState('');
    const [search, setSearch] = useState('pizza');
    const [showFood, setShowFood] = useState(false);
    useEffect(() => {
        getFood();
    }, [search]);
    const getFood = async () => {
        try {
            setShowFood(true);
            const response = await fetch(
`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
            const data = await response.json();
            setfood_r(data.hits);
            setShowFood(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setShowFood(false);
        }
    };
    const searchBarUpdate = (text) => {
        setSearch_food(text);
    };
    const searchFunction = () => {
        setSearch(search_food);
        setSearch_food('');
    };
    const refreshFunction = () => {
        getFood();
    };
    return (
        <View style={{ flex: 1, 
                    backgroundColor: '#F5F5F5', 
                    paddingTop: 30 }}>
            <View style={{ backgroundColor: '#32CD32', 
                        padding: 20, 
                        marginBottom: 20, 
                        alignItems: 'center' }}>
                <Text style={{ fontSize: 32, 
                            color: 'white', 
                            fontWeight: 'bold', 
                            textShadowColor: 'rgba(0, 0, 0, 0.75)', 
                            textShadowOffset: { width: 2, height: 2 }, 
                            textShadowRadius: 5 }}>
                    GFG Food Recipe App
                </Text>
            </View>
            <View style={{ marginHorizontal: 20, 
                        marginBottom: 20 }}>
                <TextInput style={{ height: 40,
                                    borderColor: '#E0E0E0',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 8,
                                    backgroundColor: 'white',
                                    marginBottom: 10,}}
                        placeholder="Search for food recipes..."
                        placeholderTextColor="#757575"
                        value={search_food}
                        onChangeText={searchBarUpdate}/>
                <TouchableOpacity style={{ backgroundColor: '#FF6F61',
                                            padding: 12,
                                            borderRadius: 8,
                                            alignItems: 'center',}}
                                onPress={searchFunction}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Search Food Recipe
                    </Text>
                </TouchableOpacity>
            </View>
            {showFood ? (
                <ActivityIndicator size="large"
                                color="#FF6F61"
                                style={{ marginTop: 20 }} />
            ) : (
                food_r.length === 0 ? (
                    <Text style={{ textAlign: 'center', 
                                color: '#757575', 
                                marginTop: 20 }}>
                                No recipes found. Try a different search term.
                    </Text>
                ) : (
                    <ScrollView style={{ marginHorizontal: 20 }} 
                                refreshControl={
                                <RefreshControl refreshing={showFood} 
                                                onRefresh={refreshFunction}/>}>
                        {food_r.map((recipe) => (
                            <Food key={recipe.recipe.label} 
                                recipe={recipe.recipe} />
                        ))}
                    </ScrollView>
                )
            )}
        </View>
    );
};
export default App;
