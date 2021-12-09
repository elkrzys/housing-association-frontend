import { useState, useContext } from 'react';
import { Flex, Box, useBreakpointValue, Text, Heading } from '@chakra-ui/react';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Navigation/Header';
import { Redirect } from 'react-router-dom';
import { AuthContext, ModeContext } from '../../contexts';
import Modes from '../Modes/Modes';

const MainPage = () => {
  const { user, role, token } = useContext(AuthContext);
  const { mode } = useContext(ModeContext);

  const smVariant = { navigation: 'drawer', navigationButton: true };
  const mdVariant = { navigation: 'sidebar', navigationButton: false };

  console.log('firstname: ', user.firstName);
  console.log('lastname: ', user.lastName);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return token === null ? (
    <Redirect to="/" />
  ) : (
    <Flex w="100%">
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box
        ml={!variants?.navigationButton && { base: '0', md: '16vw' }}
        w={!variants?.navigationButton && { base: '100vw', md: '84vw' }}>
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
        <Box minW="100%" justify={'center'} mt={'4vh'}>
          {mode !== null ? (
            <Modes mode={mode} />
          ) : (
            <Text px={10} textJustify={'inter-word'} textAlign={'justify'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              et magna in ligula malesuada gravida sit amet a lectus.
              Suspendisse fringilla tempor nisi vel euismod. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Sed pretium vestibulum purus sit amet finibus. Quisque
              commodo semper urna, sit amet euismod risus volutpat et. Praesent
              at tortor et nulla dictum condimentum. Morbi volutpat vestibulum
              urna, in efficitur magna. Aliquam in lacus vel nibh semper
              elementum quis quis erat. Curabitur faucibus augue at lorem porta
              faucibus vel eget enim. Mauris a faucibus elit, vitae porttitor
              ligula. Nullam ultrices eget purus non vehicula. Cras fermentum,
              nibh interdum lacinia consequat, magna justo suscipit lectus, eu
              ultricies augue mauris porttitor mauris. Quisque ut nisi quis
              metus gravida pulvinar. Morbi ornare ligula sed diam sagittis, sed
              vulputate odio vestibulum. Fusce facilisis, arcu vel interdum
              finibus, nulla enim consequat sem, eget imperdiet lectus tortor a
              leo. Mauris venenatis dui in dolor efficitur volutpat. Cras eget
              elit ac libero luctus pretium. Curabitur tincidunt ultrices
              facilisis. Donec eu arcu vehicula, congue ex sit amet, pretium
              libero. Pellentesque non suscipit nulla. Nulla hendrerit fringilla
              neque, id congue tellus sagittis non. Duis nulla eros, porttitor
              sit amet odio at, pulvinar mattis nunc. Ut lacinia tincidunt
              libero non maximus. Quisque egestas vulputate blandit. Donec et
              placerat dolor. Vestibulum porttitor, sem vel faucibus eleifend,
              mi urna cursus dolor, vitae posuere orci felis a nisl. Proin eget
              ante ac dolor gravida lobortis. Donec tincidunt, urna sed
              malesuada cursus, massa purus commodo tellus, at facilisis nisi
              velit eget neque. Etiam ornare leo dui, vitae vestibulum massa
              laoreet eu. Integer dignissim metus odio. Curabitur porta eget
              enim a laoreet. Morbi et ante quam. Morbi venenatis nibh a enim
              tempus, vel dictum ligula semper. Donec finibus, felis auctor
              tincidunt tempus, nibh velit tristique lectus, sed vulputate arcu
              massa in sapien. In eleifend leo et ipsum elementum condimentum
              eget ut urna. Integer pellentesque dapibus consequat. Curabitur
              augue ipsum, lobortis a auctor non, pharetra vitae ex.
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};
export default MainPage;
