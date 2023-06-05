"use client";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

type props = {
  property: string;
  order: string;
  setOrder: (prop: string) => void;
  setProperty: (prop: string) => void;
};

function SortMenu({ property, order, setOrder, setProperty }: props) {
  return (
    <Menu closeOnSelect={true} isLazy>
      <MenuButton as={Button} colorScheme="blue" variant={"outline"}>
        Order By
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="asc"
          value={order}
          title="Order"
          type="radio"
        >
          <MenuItemOption value="asc" onClick={() => setOrder("asc")}>
            Ascending
          </MenuItemOption>
          <MenuItemOption value="desc" onClick={() => setOrder("desc")}>
            Descending
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Property" value={property} type="radio">
          <MenuItemOption value="id" onClick={() => setProperty("id")}>
            Id
          </MenuItemOption>
          <MenuItemOption value="title" onClick={() => setProperty("title")}>
            Title
          </MenuItemOption>
          <MenuItemOption value="createdAt" onClick={() => setProperty("createdAt")}>
            Date
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default SortMenu;
