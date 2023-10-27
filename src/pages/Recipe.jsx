import React from 'react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [ingr, setIngr] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [activeTab, setActiveTab] = useState("summary");

    const fetchDetails = async (name) => {
        let details_name = 'details/' + name
        let nutrition_name = 'nutrition/' + name
        const check_details = localStorage.getItem(details_name);
        const check_nutrition = localStorage.getItem(nutrition_name);

        if (check_details) {
            setDetails(JSON.parse(check_details));
            setIngr(JSON.parse(check_details).extendedIngredients);
            setNutrition(JSON.parse(check_nutrition));

        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const detailData = await data.json();
            localStorage.setItem(details_name, JSON.stringify(detailData));
            setDetails(detailData);
            setIngr(detailData.extendedIngredients)
            console.log(detailData);

            const nutrition_data = await fetch(`https://api.spoonacular.com/recipes/${detailData.id}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`)
            const nutrition = await nutrition_data.json();
            localStorage.setItem(nutrition_name, JSON.stringify(nutrition.nutrients));
            setNutrition(nutrition.nutrients);
            console.log(nutrition);
        }

    };

    useEffect(() => {
        fetchDetails(params.name);
    }, [params.name]);

    return <DetailWrapper>
        <div>
            <h2>
                {details.title}
            </h2>
            <br />
            <img src={details.image} alt="" />
            <br />
        </div>

        <Summary>
            <Button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab("summary")}>
                Summary
            </Button>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>
                Instructions
            </Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>
                Ingredients
            </Button>
            <Button className={activeTab === 'nutrition' ? 'active' : ''} onClick={() => setActiveTab("nutrition")}>
                Nutritional information
            </Button>

            {activeTab === 'summary' && (
                <div>
                    <br />
                    <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
                    <br />
                </div>
            )}
            {activeTab === 'instructions' && (
                <div>
                    <br />
                    <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
                    <br />
                </div>
            )}
            {activeTab === 'ingredients' && (
                <div>
                    <br />
                    <ul>
                        {ingr.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                    <br />
                </div>
            )}
            {activeTab === 'nutrition' && (
                <div>
                    <br />
                    <ul>
                        {nutrition.map((nut) => (
                            <li key={nut.name}>{nut.name} = {nut.amount} {nut.unit}</li>
                        ))}
                    </ul>
                    <br />
                </div>
            )}
        </Summary>
    </DetailWrapper>

}

const DetailWrapper = styled.div`
    margin-botton: 5rem;
    display: flex;
    img{
        border-radius: 2rem;
        
    }
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    margin-top: 2rem;
    
    &:hover{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
`;

const Summary = styled.div`
    margin-left: 5rem;
`;

export default Recipe