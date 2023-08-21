"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is 100 meters from the beach",
  },
  {
    label: "Windmills",
    icon: MdOutlineVilla,
    description: "This property is 100 meters from the beach",
  },
  {
    label: "Modern",
    icon: GiWindmill,
    description: "This property is 100 meters from the beach",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing nearby",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is close to a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping nearby",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in the arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave nearby",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert nearby",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categoryParams = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";
  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            selected={categoryParams === category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
