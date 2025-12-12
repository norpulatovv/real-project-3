import React from "react";

function Brands({ brands }) {

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cold-12 gap-4">
                {brands.map(brand => (
                    <div
                        key={brand.id}
                        className="bg-white rounded-lg p-4 felx items-center justify-center hover:shadow-lg transtion cursor-pointer h-20">
                        <img src={brand.logo} alt={brand.name}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Brands;