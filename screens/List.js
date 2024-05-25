import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsers, deleteUser } from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import Login from './Login';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function List() {
    const navigation = useNavigation();
    const route = useRoute();
    const { token } = route.params;

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const data = await getUsers(token);
            setUsers(data);
        } catch (error) {
            alert('Failed to Search');
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUsers();
        }, [])
    );

    const handleDelete = async (id) => {
        try {
            await deleteUser(id, token);
            fetchUsers();
            setSelectedUser(null); 
        } catch (error) {
            alert('Failed to Delete');
        }
    };

    const handleLogout = async () => {
        try {
            alert('Loggin out');
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
        } catch (error) {
            alert('Failed to Logout');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableHighlight
            underlayColor="#ddd"
            onPress={() => setSelectedUser(item)}
            style={[
                styles.item,
                selectedUser?.id === item.id ? styles.selectedItem : null,
            ]}
        >
            <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUsername}>{item.username}</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <Stack.Navigator>
          <Stack.Screen name="ListScreen" options={{ headerShown: false, title: 'User List'}}>
            {() => (
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('UserForm', { token })}
                >
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>User List</Text>
                <FlatList
                  contentContainerStyle={{ paddingTop: 80 }}
                  data={users}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
                {selectedUser && (
                  <View style={styles.actionsContainer}>
                    <Button
                      title="Edit"
                      onPress={() => navigation.navigate('UserForm', { user: selectedUser, token })}
                    />
                    <Button
                      title="Delete"
                      onPress={() => handleDelete(selectedUser.id)}
                    />
                  </View>
                )}
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedItem: {
        backgroundColor: '#e0e0e0',
    },
    addButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#007bff',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    logoutButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#ff6347',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemUsername: {
        fontSize: 14,
        color: '#555',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        top: 100,
    },
});
