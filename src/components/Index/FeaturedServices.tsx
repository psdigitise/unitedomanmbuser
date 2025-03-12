import { FeaturedServicesCard } from "./FeaturedServices/FeaturedServicesCard";
import bridalMakeup from "../../assets/images/bridalMakeup.png";
import hairSkin from "../../assets/images/hairSkin.png";
import skin from "../../assets/images/skin.png";
import nails from "../../assets/images/nails.png";
import React, { useEffect, useState } from "react";
import { featuredServices } from "../../api/ApiConfig";
import { ShimmerTable } from "shimmer-effects-react";

interface FeaturedServicesProps {
  category_id?: string;
  category_name: string;
  status: string;
  image: string;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = () => {
  const [featuredServicesData, setFeaturedServicesData] = useState<
    FeaturedServicesProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [categoryID, setCategoryID] = useState("");
  // const [categoryID, setCategoryID] = useState<string[]>([]); // Store all category IDs

  useEffect(() => {
    // API call to fetch data
    const loadFeaturedServicesData = async () => {
      try {
        // const data = await fetchFAQs();
        const data = await featuredServices();
        setFeaturedServicesData(data.data); // Directly set the fetched data
        console.log("Featured Services data log:", data.data);
        // setCategoryID(data.data[0].category_id)

        // Set the categoryID based on the first category (or any other logic)
        // if (data.data.length > 0) {
        //     setCategoryID(data.data.category_id);
        // }

        // Extract all category IDs and set them
        // const ids = data.data.map((service: FeaturedServicesProps) => service.category_id);
        // setCategoryID(ids);
      } catch (error: any) {
        console.error("Error fetching Featured Services:", error);
        setError("Failed to fetch Featured Services data.");
      } finally {
        setLoading(false); // Always stop loading after fetch
      }
    };
    loadFeaturedServicesData();
  }, []);

  if (loading) return <div className="container mx-auto text-center">
    <ShimmerTable
      mode="light"
      row={6}
      col={4}
      border={1}
      borderColor={"#cbd5e1"}
      rounded={0.25}
      rowGap={16}
      colPadding={[10, 5, 10, 5]}
    />
  </div>;

  if (error) return <div className="text-sm text-red-500 text-center">{error}</div>;

  // Fallback images
  const defaultImages = [bridalMakeup, hairSkin, skin, nails];

  return (
    <section className="lg:pb-[100px] md:pb-[80px] pb-[60px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 text-center">
          <h2 className="font-Montserrat text-[40px] text-mindfulBlack font-bold mb-[30px] max-lg:text-[35px] max-md:text-[30px] max-md:mb-[20px] max-sm:text-[24px]">
            Featured Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {featuredServicesData.length > 0 ? (
            featuredServicesData.map((fsData, index) => (
              <FeaturedServicesCard
                key={fsData.category_id || index} // Use index as a fallback key
                cardImage={
                  fsData.image || defaultImages[index % defaultImages.length]
                } // Use dynamic image or fallback
                cardImageAlt={fsData.category_name || "Featured Service"}
                cardCaption={fsData.category_name || "Service Name"}
                // catID={categoryID}
                catID={fsData.category_id}
              />
            ))
          ) : (
            <div>No Featured Services Available</div>
          )}
          {/* <FeaturedServicesCard cardImage={hairSkin} cardImageAlt={"Hair & Skin"} cardCaption={"Hair"} />
                <FeaturedServicesCard cardImage={skin} cardImageAlt={"Products"} cardCaption={"Skin"} />
                <FeaturedServicesCard cardImage={nails} cardImageAlt={"Nails"} cardCaption={"Nails"} /> */}
        </div>
      </div>
    </section>
  );
};
