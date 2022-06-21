/* eslint-disable prettier/prettier */
import {Text,TouchableOpacity,Button,StyleSheet} from 'react-native';
import React,{useState} from 'react';
import {VStack,HStack,Flex} from 'react-native-flex-layout';
import CheckWinner from '../components/CheckWinner';


function Box ({value,onPress,disabled,highlighted}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Flex w={100} h={100} center style={{backgroundColor: highlighted ? 'lightgreen' : 'lightgray'}}>
            <Text style={styles.text}>{value}</Text>
        </Flex>
        </TouchableOpacity>
    );
};

const HomePage = () => {

    const [ currentPlayer, setCurrentPlayer] = useState('X');
    const [ board, setBoard] = useState(Array(9).fill(null));
    const [ highlighted, setHighlighted] = useState([]);
    const [ winner, setWinner] = useState(null);

    const handlePress = (index) => {
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        const winnerLine = CheckWinner(newBoard);
        if (winnerLine) {
            setHighlighted(winnerLine);
            setWinner(currentPlayer);
            alert(`${currentPlayer} Kazandı`);
        } else {
            setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
        }
    };
    const handleReset = () => {
        setCurrentPlayer('X');
        setBoard(Array(9).fill(null));
        setHighlighted([]);
        setWinner(null);
    };
    const getBox = (index) => (
        <Box
            value={board[index]}
            onPress={()=>handlePress(index)}
            highlighted={highlighted.includes(index)}
            disabled={winner || board[index]}
            />
    );

  return (
    <VStack style={styles.VStack} center spacing={4}>
        <Text style={styles.text2}>Oynama Sırası {currentPlayer}</Text>
        <HStack spacing={4} shouldWrapChildren>
            {getBox(0)}
            {getBox(1)}
            {getBox(2)}
        </HStack>
        <HStack spacing={4} shouldWrapChildren>
            {getBox(3)}
            {getBox(4)}
            {getBox(5)}
        </HStack>
        <HStack spacing={4} shouldWrapChildren>
            {getBox(6)}
            {getBox(7)}
            {getBox(8)}
        </HStack>
        <Button title="Sıfırla" onPress={handleReset}/>
    </VStack>
  );
};
const styles = StyleSheet.create({
    text:{
        fontSize:56,
    },
    VStack:{
        width:'100%',
        height:'100%',
    },
    text2:{
        fontSize:36,
    },
  });

export default HomePage;
