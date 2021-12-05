import { useState, useContext } from 'react';
import {
    Flex, Box, useBreakpointValue, Text, Center
} from '@chakra-ui/react';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header'
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom'

const Layout = () => {
    const {user, role, token} = useContext(AuthContext)

    const smVariant = { navigation: 'drawer', navigationButton: true }
    const mdVariant = { navigation: 'sidebar', navigationButton: false }

    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const variants = useBreakpointValue({ base: smVariant, md: mdVariant })
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (token === null) ?  (<Navigate from="/home" to="/" />) :
    (
       
        <Flex>
            <Sidebar
                variant={variants?.navigation}
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
            />
            <Box ml={!variants?.navigationButton && '16vw'} w={!variants?.navigationButton && '84vw'}>
                <Header 
                    showSidebarButton={variants?.navigationButton}
                    onShowSidebar={toggleSidebar}
                />
                <Flex p={10}>
                    <Center as={'h1'}>Hello, {user.firstName}!</Center>
                <Text p={10} textJustify={'inter-word'} textAlign={'justify'}>
                    

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et magna in ligula malesuada gravida sit amet a lectus. Suspendisse fringilla tempor nisi vel euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed pretium vestibulum purus sit amet finibus. Quisque commodo semper urna, sit amet euismod risus volutpat et. Praesent at tortor et nulla dictum condimentum. Morbi volutpat vestibulum urna, in efficitur magna. Aliquam in lacus vel nibh semper elementum quis quis erat. Curabitur faucibus augue at lorem porta faucibus vel eget enim. Mauris a faucibus elit, vitae porttitor ligula. Nullam ultrices eget purus non vehicula. Cras fermentum, nibh interdum lacinia consequat, magna justo suscipit lectus, eu ultricies augue mauris porttitor mauris.

Quisque ut nisi quis metus gravida pulvinar. Morbi ornare ligula sed diam sagittis, sed vulputate odio vestibulum. Fusce facilisis, arcu vel interdum finibus, nulla enim consequat sem, eget imperdiet lectus tortor a leo. Mauris venenatis dui in dolor efficitur volutpat. Cras eget elit ac libero luctus pretium. Curabitur tincidunt ultrices facilisis. Donec eu arcu vehicula, congue ex sit amet, pretium libero. Pellentesque non suscipit nulla. Nulla hendrerit fringilla neque, id congue tellus sagittis non.

Duis nulla eros, porttitor sit amet odio at, pulvinar mattis nunc. Ut lacinia tincidunt libero non maximus. Quisque egestas vulputate blandit. Donec et placerat dolor. Vestibulum porttitor, sem vel faucibus eleifend, mi urna cursus dolor, vitae posuere orci felis a nisl. Proin eget ante ac dolor gravida lobortis. Donec tincidunt, urna sed malesuada cursus, massa purus commodo tellus, at facilisis nisi velit eget neque. Etiam ornare leo dui, vitae vestibulum massa laoreet eu. Integer dignissim metus odio. Curabitur porta eget enim a laoreet.

Morbi et ante quam. Morbi venenatis nibh a enim tempus, vel dictum ligula semper. Donec finibus, felis auctor tincidunt tempus, nibh velit tristique lectus, sed vulputate arcu massa in sapien. In eleifend leo et ipsum elementum condimentum eget ut urna. Integer pellentesque dapibus consequat. Curabitur augue ipsum, lobortis a auctor non, pharetra vitae ex. Ut at pretium urna. In sit amet ligula ante. Sed dignissim convallis purus, et venenatis nisi blandit ac. Praesent molestie cursus sollicitudin. Duis sodales aliquet dolor, nec auctor lacus auctor in. Suspendisse augue ligula, faucibus in felis non, auctor blandit nunc. Morbi eleifend tristique lacus sed elementum. Etiam eleifend sodales interdum. Duis eget elit sed sapien semper maximus. In dapibus orci id malesuada placerat.

Morbi id nunc non urna rhoncus pretium. Nulla placerat lacinia sapien, in sodales erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec porta mi quis risus suscipit, vel facilisis ligula maximus. Maecenas mollis, dolor vel tempus auctor, sem nulla cursus nulla, vel egestas sapien nunc non augue. Cras ut bibendum ex. Curabitur dolor nulla, pharetra a ex sit amet, mollis gravida risus.
Generated 5 paragraphs, 458 words, 3055 bytes of Lorem Ipsum
                </Text>
                </Flex>
            </Box>
           
            
            
        </Flex>
    )
}
export default Layout;