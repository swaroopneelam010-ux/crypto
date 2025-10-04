import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_COIN_API_URL

const CoinDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchCoin = async () => {

            try {

                const res = await fetch(`${API_URL}/${id}`);
                if (!res.ok) throw new Error('failed to fetch data');
                const data = await res.json();

                setCoin(data);

            } catch (error) {
                console.log(error)
                setError(error.message);

            } finally {
                setLoading(false);
            }

        }

        fetchCoin();

    }, [id]);



    return (<div className="coin-detail-container">

        <Link to='/'>Back to home</Link>

        <h1 className="coin-detail-title">{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'coin Details'}</h1>

        {loading && <p>Loading...</p>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
            <>
                <img src={coin.image.large}
                    alt={coin.name}
                    className="coin-details-image" />
                <p>{coin.description.en.split('.')[0] + '.'}</p>
                <div className="coin-details-info">
                    <h3>Rank: #{coin.market_cap_rank}</h3>
                    <h3>current Prices:{''}
                        {coin.market_data.current_price.usd.toLocaleString()}
                    </h3>
                    <h4>Market Cap:${coin.market_data.market_cap.usd.toLocaleString()}</h4>
                    <h4>24h High:${coin.market_data.high_24h.usd.toLocaleString()}</h4>
                    <h4>24h Low:${coin.market_data.low_24h.usd.toLocaleString()}</h4>
                    <h4>24h Price Change :${coin.market_data.price_change_24h.toFixed(2)}
                        ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)</h4>
                    <h4>Circulating Supply:{coin.market_data.circulating_supply.toLocaleString()}</h4>
                    <h4>Total Supply:{coin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>
                    <h4>All-Time High:${coin.market_data.ath.usd.toLocaleString()} on
                        {''} {new Date(coin.market_data.ath_date.usd).toLocaleString()}</h4>
                    <h4>All-Time Low:${coin.market_data.atl.usd.toLocaleString()} on
                        {''} {new Date(coin.market_data.atl_date.usd).toLocaleString()}</h4>
                    <h4>Last Updated :{new Date(coin.last_updated).toLocaleString()}</h4>
                    <div className="coin-detail-links">
                        {coin.links.homepage[0] && (<p>
                            {''} <a href={coin.links.homepage[0]}
                                target="_blank" rel='noopener noreferrer'>website</a>
                        </p>
                        )}
                    </div>

                    <div className="coin-detail-links">
                        {coin.links.blockchain_site[0] && (<p>
                            {''} <a href={coin.links.blockchain_site[0]}
                                target="_blank" rel='noopener noreferrer'>Blockchain explorer</a>
                        </p>
                        )}
                        {coin.categories.length > 0 && (
                            <p>Categories: {coin.categories.join(',')}</p>
                        )}
                    </div>
                    {!loading && !error && !coin && <P>No Data found</P>}
                </div>
            </>

        )}
    </div>);
}

export default CoinDetails;