import React from "react";
import { comunidades } from "./constants";

const ProvinceLocalitySelector = ({
province, setProvince, locality, setLocality
})=> 
{return (
<>     
        <select value={province}
                name ="province"
                onChange={(e)=> setProvince(e.target.value)}
                required>
                <option value="">Selecciona una provincia</option>
                {Object.keys(comunidades).map((province)=> (
                <option key={province} value={province}>
                {province}
                </option>
                ))}
        </select>
        {province && (
                <select 
                value={locality} 
                name = "locality"
                onChange={(e)=> setLocality(e.target.value)} required>
                <option value="">Selecciona una localidad</option>
                {comunidades[province].map((locality)=> (       
                <option key={locality} value={locality}>
                {locality}
                </option>
                ))}  

                </select>

        )


        }



</>
)



};

export default ProvinceLocalitySelector;