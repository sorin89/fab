import { IconButton, ButtonGroup, HStack, Box, Flex, Select } from '@chakra-ui/react'
import { HiViewList, HiViewGrid } from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";

export default function Options(props: {
  results: any;
  view: string;
  colorMode: string;
  onChange: any;
  onClickList: any;
  onClickGrid: any;
}) {
  return (
    <Box className="rounded mt-1" bg={props.colorMode === 'light' ? 'gray.50' : 'gray.700' }>
      <Flex>
        <Box flex="1" className="flex p-2 sm:p-4 items-center text-sm">{props.results.length} results</Box>
        <Box className="p-2 sm:p-4">
          <HStack>
            <Select icon={<BiSortAlt2/>} onChange={props.onChange} className={`border cursor-pointer  ${props.colorMode === 'light' ? 'border-gray-200' : 'border-gray-500'}`}>
              <option>Default</option>
              <option>Title</option>
              <option>Year</option>
            </Select>
          </HStack>
        </Box>
        <Box className="p-2 sm:p-4 rounded-r-xl">
          <ButtonGroup isAttached variant="outline">
            <IconButton isActive={props.view == 'list'} onClick={props.onClickList} aria-label='List view' icon={<HiViewList/>} />
            <IconButton isActive={props.view == 'grid'} onClick={props.onClickGrid} aria-label='Grid View' icon={<HiViewGrid/>} />
          </ButtonGroup>
        </Box>
      </Flex>
    </Box>
  );
}