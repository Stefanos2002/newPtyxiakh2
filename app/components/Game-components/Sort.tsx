"use client";
import React, { Dispatch, SetStateAction } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Sort() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div className="flex items-center justify-center h-10 text-xl text-white">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize w-[12vw]">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="text">Text</DropdownItem>
          <DropdownItem key="number">Number</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
          <DropdownItem key="single_date">Single Date</DropdownItem>
          <DropdownItem key="iteration">Iteration</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
