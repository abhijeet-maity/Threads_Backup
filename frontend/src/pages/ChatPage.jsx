import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Input, useColorModeValue, Button, Text, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import Conversation from '../components/Conversation'
import { GiConversation } from 'react-icons/gi';
import MessageContainer from '../components/MessageContainer';
import usePopToast from "../customHooks/usePopToast";
import {conversationsAtom} from '../atoms/messagesAtom';
import { useRecoilState } from "recoil";

const ChatPage = () => {
  const popToast = usePopToast();
  const [loadConversations, setLoadConversations] = useState(true);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  useEffect(() => {

    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data  = await res.json();
        if(data.error) {
          popToast("Error", data.error, "error");
          return; 
        }
        console.log(data);
        setConversations(data);

      } catch (error) {
        popToast("Error", error.message, "error");
      } finally {
        setLoadConversations(false); //
      }
    };
    getConversations();
    },[popToast, setConversations])


    return (
    <Box position={"absolute"} left={"50%"} transform={"translateX(-50%)"} p={4} w={{base: "100%", md: "80%", lg: "750px"}} >
      
      <Flex gap={4} flexDirection={{base: "column", md: "row"}} maxW={{sm: "400px", md: "full"}} mx={"auto"}>
        <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm : "250px", md: "full"}} mx={"auto"}>
            <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>Your Conversations</Text>
            <form action="">
                <Flex alignItems={"center"} gap={2}>
                    <Input placeholder='Search for a user'/>
                    <Button size={"sm"}>
                        <SearchIcon/>
                    </Button>
                </Flex>
            </form>

            {loadConversations && 
            [0,1,2,3,4].map((_, i) => (
                <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                    <Box>
                        <SkeletonCircle size={"10"}/>
                    </Box>
                    <Flex w={"full"} flexDirection={"column"} gap={3}>
                        <Skeleton h={"10px"} w={"80px"}/>
                        <Skeleton h={"8px"} w={"90%"}/>
                    </Flex>
                </Flex>
            ))}

            {!loadConversations && 
             conversations.map((conversation) => (
                <Conversation key={Conversation._id} conversation={conversation} />          
            ))}
            
            
        </Flex>
        {/* <Flex flex={70} borderRadius={"md"} p={2} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
          <GiConversation size={70}/>
          <Text>Select a Conversation to start messaging</Text>
        </Flex> */}
        <MessageContainer/>
        {/* <Flex flex={70}>Message container</Flex> */}
      </Flex>
    </Box>
  )
}

export default ChatPage
