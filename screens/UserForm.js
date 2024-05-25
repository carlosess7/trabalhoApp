import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUser, updateUser } from '../services/api';

export default function UserForm({ route, navigation }) {
    const { user, token } = route.params || {};
    const [name, setName] = useState(user ? user.name : '');
    const [username, setUsername] = useState(user ? user.username : '');
    const [password, setPassword] = useState('');

    const handleSave = async () => {
        const userData = { name, username, password };

        try {
            if (user) {
                await updateUser(user.id, userData, token);
            } else {
                await createUser(userData, token);
            }
            navigation.goBack();
        } catch (error) {
            alert('Failed to save User');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user ? 'Edit User' : 'Add User'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            {!user && (
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            )}
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
