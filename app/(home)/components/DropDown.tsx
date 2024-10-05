import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
type Props = {
  options: {
    title: string;
    description: string;
  }[];
  selectedKeys: string;
  label: string;
  placeholder: string;
  className: string;
  setSelectedKeys: React.Dispatch<React.SetStateAction<string>>;
};

export function DropDownButton({
  label,
  options,
  setSelectedKeys,
  selectedKeys,
  className,
  placeholder,
}: Props) {
  return (
    <Autocomplete
      defaultItems={options}
      variant="bordered"
      label={label}
      placeholder={placeholder}
      labelPlacement="inside"
      className={className}
      selectedKey={selectedKeys}
      onSelectionChange={(e) => setSelectedKeys(String(e))}
    >
      {(options: { title: string; description: string }) => (
        <AutocompleteItem key={options.title} textValue={options.title}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-small">{options.title}</span>
              <span className="text-tiny text-default-400">
                {options.description}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
// type Props = {
//   options: {
//     title: string;
//     description: string;
//   }[];
//   selectedKeys: string;
//   setSelectedKeys: React.Dispatch<React.SetStateAction<string>>;
// };
// export default function DropdownButton({
//   options,
//   setSelectedKeys,
//   selectedKeys,
// }: Props) {
//   //   const [selectedKeys, setSelectedKeys] = React.useState(options[0].title);

//   return (
//     <Dropdown backdrop="blur">
//       <DropdownTrigger>
//         <Button variant="shadow" color="secondary" className="capitalize">
//           <div className="gap-1 flex items-center">
//             {" "}
//             {selectedKeys}
//             <FontAwesomeIcon icon={faSquareCaretDown} />
//           </div>
//         </Button>
//       </DropdownTrigger>
//       <DropdownMenu
//         aria-label="Single selection example"
//         variant="flat"
//         disallowEmptySelection
//         selectionMode="single"
//         selectedKeys={selectedKeys}
//         onSelectionChange={(e: Iterable<unknown> | ArrayLike<unknown>) => {
//           console.log(Array.from(e));
//           console.log(Array.from(e).join(", "));
//           console.log(Array.from(e).join(", ").replaceAll("_", " "));
//           setSelectedKeys(Array.from(e).join(", ").replaceAll("_", " "));
//         }}
//       >
//         {options.map((option) => (
//           <DropdownItem key={option.title} description={option.description}>
//             {option.title}
//           </DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
