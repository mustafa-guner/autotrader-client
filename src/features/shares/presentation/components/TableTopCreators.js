import {
    Avatar,
    Box,
    Button,
    Flex,
    Input,
    Progress,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { useMemo } from 'react';
import { debounce } from 'lodash';

const columnHelper = createColumnHelper();

function TopCreatorTable(props) {
    const { tableData } = props;
    const [sorting, setSorting] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [debouncedQuery, setDebouncedQuery] = React.useState('');

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    // Debounce function to limit how often we filter
    const handleSearch = useMemo(() => debounce(setDebouncedQuery, 300), []);

    React.useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery, handleSearch]);

    const filteredData = useMemo(() => {
        return tableData.filter((row) =>
            row.name[0].toLowerCase().includes(debouncedQuery.toLowerCase())
        );
    }, [debouncedQuery, tableData]);

    const columns = [
        columnHelper.accessor('name', {
            id: 'name',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    NAME
                </Text>
            ),
            cell: (info) => (
                <Flex align="center">
                    <Avatar src={info.getValue()[1]} w="30px" h="30px" me="8px" />
                    <Text color={textColor} fontSize="sm" fontWeight="600">
                        {info.getValue()[0]}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor('artworks', {
            id: 'artworks',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    ARTWORKS
                </Text>
            ),
            cell: (info) => (
                <Text color={textColorSecondary} fontSize="sm" fontWeight="500">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor('rating', {
            id: 'rating',
            header: () => (
                <Text
                    justifyContent="space-between"
                    align="center"
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color="gray.400"
                >
                    RATING
                </Text>
            ),
            cell: (info) => (
                <Flex align="center">
                    <Progress
                        variant="table"
                        colorScheme="brandScheme"
                        h="8px"
                        w="108px"
                        value={info.getValue()}
                    />
                </Flex>
            ),
        }),
        // Add a new column for the Buy button
        {
            id: 'buyButton',
            header: () => (
                <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                    ACTION
                </Text>
            ),
            cell: () => (
                <Button
                    variant='darkBrand'
                    color='white'
                    fontSize='sm'
                    fontWeight='500'
                    borderRadius='70px'
                    px='24px'
                    py='5px'>
                    Buy
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <Flex direction="column" w="100%" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex
                align={{ sm: 'flex-start', lg: 'center' }}
                justify="space-between"
                w="100%"
                px="22px"
                pb="20px"
                mb="10px"
                boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)">
            </Flex>

            {/* Search input */}
            <Flex px="22px" pb="10px">
                <Input
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    maxW="300px"
                />
            </Flex>

            <Box>
                <Table variant="simple" color="gray.500" mt="12px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        pe="10px"
                                        borderColor={borderColor}
                                        cursor="pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <Flex
                                            justifyContent="space-between"
                                            align="center"
                                            fontSize={{ sm: '10px', lg: '12px' }}
                                            color="gray.400"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: '',
                                                desc: '',
                                            }[header.column.getIsSorted()] ?? null}
                                        </Flex>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table
                            .getRowModel()
                            .rows.slice(0, 11)
                            .map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td
                                            key={cell.id}
                                            fontSize={{ sm: '14px' }}
                                            minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                            borderColor="transparent"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
}

export default TopCreatorTable;
