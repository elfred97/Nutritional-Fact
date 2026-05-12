import { useEffect, useState } from 'react'
import axios from 'axios';
// import './App.css'

function App() {
  const [food_item, setFoodItem] = useState('');
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(null);

  // get the API result
  // add the results to the list

  
    useEffect(() => {
    calculateTotal();
    }, [list]);

  async function fetchData() {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/nutrition?query=' + food_item, {
        headers: {
          'X-Api-Key': '6t4IY9bVUmWRpbii3J9kS1yZtBvrvlpUQRoMgwFk'
        }
      })
    
        // check for empty result
        if (response.data.length === 0) {
          alert('No results found for "' + food_item + '". Please try a different query.');
          return;
        }
        setList(prevList => [Array.isArray(prevList) ? prevList : [], response.data].flat());
    } catch (error) {
      console.error(error);
    }
  };
  // remove item from the list
function deleteItem(e) {
    e.preventDefault();
    const itemName = e.target.closest('tr').querySelector('th').textContent;
    setList(prevList => prevList.filter(item => item.name !== itemName));
}

  // calculate the totals
function calculateTotal() {
    if (list && list.length > 0) {
        const totalServingSize = list?.reduce((acc, item) => acc + item.serving_size_g, 0);
        const totalFat = list?.reduce((acc, item) => acc + item.fat_total_g, 0);
        const totalSaturatedFat = list?.reduce((acc, item) => acc + item.fat_saturated_g, 0);
        const totalSodium = list?.reduce((acc, item) => acc + item.sodium_mg, 0);
        const totalPotassium = list?.reduce((acc, item) => acc + item.potassium_mg, 0);
        const totalCholesterol = list?.reduce((acc, item) => acc + item.cholesterol_mg, 0);
        const totalCarbohydrates = list?.reduce((acc, item) => acc + item.carbohydrates_total_g, 0);
        const totalFiber = list?.reduce((acc, item) => acc + item.fiber_g, 0);
        const totalSugar = list?.reduce((acc, item) => acc + item.sugar_g, 0);

        setTotal({
            serving_size: totalServingSize,
            fat: totalFat,
            saturatedFat: totalSaturatedFat,
            sodium: totalSodium,
            potassium: totalPotassium,
            cholesterol: totalCholesterol,
            carbohydrates: totalCarbohydrates,
            fiber: totalFiber,
            sugar: totalSugar
        });
    } else {
        setTotal(null); // reset total if list is empty
    }
}
    return (
        <>
        <section className="center">

        <h1 className="text-3xl font-bold underline">
        Nutritional Facts
        </h1>
        <div className="spacer"></div>
        <div className="input-group">
        <div className="flex">
            <input 
            type="text" 
            className="w-full rounded-l-md border-y border-l border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
            placeholder="Search..." 
            value={food_item} 
            onChange={(e) => setFoodItem(e.target.value)}
            />
            <button 
            className="rounded-r-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none"
            onClick={fetchData}
            >
            Submit
            </button>
        </div>
        <p><i>eg. 1lb brisket and fries</i></p>

        </div>
        
        <div className="spacer"></div>
        
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="bg-neutral-secondary-soft border-b border-default">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Serving Size
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Total Fat (g)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Saturated Fat (g)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Sodium (mg)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Potassium (mg)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Cholesterol (mg)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Total Carbohydrates (g)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Fiber (g)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Sugar (g)
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {list && list.map((item, index) => (
                    <tr key={index} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                            {item.name}
                        </th>
                        <td className="px-6 py-4">
                            {item.serving_size_g} g
                        </td>
                        <td className="px-6 py-4">
                            {item.fat_total_g} g
                        </td>
                        <td className="px-6 py-4">
                            {item.fat_saturated_g} g
                        </td>
                        <td className="px-6 py-4">
                            {item.sodium_mg} mg
                        </td>
                        <td className="px-6 py-4">
                            {item.potassium_mg} mg
                        </td>
                        <td className="px-6 py-4">
                            {item.cholesterol_mg} mg
                        </td>
                        <td className="px-6 py-4">
                            {item.carbohydrates_total_g} g
                        </td>
                        <td className="px-6 py-4">
                            {item.fiber_g} g
                        </td>
                        <td className="px-6 py-4">
                            {item.sugar_g} g
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-fg-brand hover:underline" onClick={deleteItem}>Delete</a>
                        </td>
                    </tr>
                ))}
                </tbody>
                {total && (
                    <tfoot className="bg-neutral-primary-soft border-b border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                <b>Total</b>
                            </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.serving_size} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.fat} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.saturatedFat} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.sodium} mg
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.potassium} mg
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.cholesterol} mg
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.carbohydrates} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.fiber} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            {total.sugar} g
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            
                        </th>
                    </tr>
                </tfoot>
                )}
                
            </table>
        </div>
        <div className="spacer"></div>
        <p>Powered by API Ninja <a href="https://api-ninjas.com/">https://api-ninjas.com/</a></p>
        </section>

        </>
    )
}

export default App
