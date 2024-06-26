import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoin()
    },
    
    searchCoin: debounce (async () => {
        const {query} = homeStore.getState()
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
        console.log(res)
        
    }, 1000),
    
    fetchCoins: async () => {
        const res = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        // console.log(res);
        
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                id: coin.item.coin_id,
                image: coin.item.large,
                price_btc: coin.item.price_btc
            }
        })

        set({coins})
    }
    
    

}))

export default homeStore;