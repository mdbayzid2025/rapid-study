'use client';

import { useRouter } from "next/navigation";

// Function to update multiple search params at once
export const useUpdateSearchParams = () => {
    const navigate = useRouter();
    const updateSearchParams = (paramsObject: any) => {
        const searchParams = new URLSearchParams(location.search);

        // Update or delete each parameter based on the provided object
        Object.entries(paramsObject).forEach(([key, value]) => {
            if (value) {
                searchParams.set(key, value.toString());
            } else {
                searchParams.delete(key);
            }
        });

        // Combine pathname and updated search params into a single URL string
        const updatedUrl = `${location.pathname}?${searchParams.toString()}`;

        // Navigate with the updated URL
        navigate.push(updatedUrl);
    };

    return updateSearchParams;
};
