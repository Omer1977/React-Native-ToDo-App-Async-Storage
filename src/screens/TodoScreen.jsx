import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  AddSquare,
  CloseSquare,
  Edit,
  TickSquare,
  Trash,
} from 'iconsax-react-native';

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async id => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completeTodo = async id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodos = id => {
    const exitingTodo = todos?.find(item => item.id === id);
    if (!exitingTodo) return;
    Alert.prompt(
      'Edit Todo',
      'Update',
      newUpdateText => {
        if (newUpdateText) {
          const updateTodos = todos.map(i =>
            i?.id === id ? {...i, text: newUpdateText} : i,
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },
      'plain-text',
      exitingTodo.text,
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    // Input boşsa todo ekleme
    if (!todo.trim()) {
      return;
    }

    const updatedTodos = [...(todos || []), {id: uuid.v4(), text: todo}];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTodo(''); // Input alanını temizle
  };

  return (
    <LinearGradient colors={['#EAD8B1', '#3A6D8C']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>To-Do List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={text => setTodo(text)}
            placeholder="Type a Todo"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.button, styles.addButton]}>
            <AddSquare size="32" color="#FF8A65" variant="Bulk" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}>
                {item?.text}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)}
                    style={[styles.completeButton, styles.button]}>
                    <Text style={styles.buttonText}>
                      {item.completed ? (
                        <CloseSquare size="32" color="#606676" variant="Bulk" />
                      ) : (
                        <TickSquare size="32" color="#FF8A65" variant="Bulk" />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.deleteButton, styles.button]}>
                    <Text style={styles.buttonText}>
                      <Trash size="32" color="#FF8A65" variant="Bulk" />
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.updateButton, styles.button]}>
                    <Text style={styles.buttonText}>
                      <Edit size="32" color="#FF8A65" variant="Bulk" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'white',
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    color: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  todoText: {
    color: '#000',
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {},
  deleteButton: {
    //backgroundColor: 'red',
    padding: 10,
  },
  updateButton: {
    //backgroundColor: 'green',
    padding: 10,
  },
  completeButton: {
    padding: 10,
  },
});
