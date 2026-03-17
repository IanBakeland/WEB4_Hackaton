import { NavLink, Outlet, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import "./sidebar.css";
import { fetchAllCountries } from "../services/mealApi.js";

const Sidebar = () => {
    const [countries, setCountries] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countriesData = await fetchAllCountries();
                setCountries(countriesData.meals || []);
            } catch (error) {
                console.error("Failed to load countries:", error);
            } finally {
                setIsLoadingCountries(false);
            }
        };

        loadCountries();
    }, []);

    return (
        <div className="app-layout">
            {isNavigating && (
                <div className="global-spinner">Loading...</div>
            )}
            <nav className="sidebar">
                <div className="sidebar-header">
                    <h2>Meal Explorer</h2>
                </div>
                <ul className="sidebar-nav">
                    <li>
                        <NavLink to="/" end>
                            Home
                        </NavLink>
                    </li>
                </ul>

                <div className="sidebar-section">
                    <h3>Countries</h3>
                    <ul className="sidebar-nav">
                        {countries.map((country) => (
                            <li key={country.strArea}>
                                <a href="#" onClick={(e) => e.preventDefault()} className="country-link">
                                    {country.strArea}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <main className="app-main">
                <Outlet context={{ countries }} />
            </main>
        </div>
    );
};

export default Sidebar;
