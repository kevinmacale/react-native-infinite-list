import React, { Component } from "react";
import { ActivityIndicator, FlatList, View, Text, TouchableOpacity, Alert, Image, } from "react-native";
import { Header, Divider } from 'react-native-elements';
import { MainStyles } from '../constants/styles.constant';
import UserService from '../services/user.service';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            page: 0,
            loading: false
        };
        this.mainStyles = MainStyles;
        this.userService = new UserService();
    }

    async componentWillMount() {
        await this.getMoreUser();
    }

    getMoreUser = async () => {
        this.setState({ loading: true });
        var results = await this.userService.fetchUserData(this.state.page);
        this.setState(state => ({
            users: [...state.users, ...results],
            loading: false
        }));
    };

    handleEndOfList = async () => {
        console.log("handle end");
        this.setState(state => ({ page: state.page + 1 }), async () => await this.getMoreUser());
    };

    handleLoading() {
        console.log("handle loading");
        return this.state.loading
            ? null
            : <ActivityIndicator size="large" animating color='lightblue' />;
    }

    handleSelectPatient = (item, index) => {
        var details = `User#: ${index} - ${item.email} | ${item.login.username}`;
        Alert.alert('User Detail', details);
    }

    render() {
        return (
            <View style={this.mainStyles.container}>
                <Header
                    placement="left"
                    centerComponent={{ text: 'User List', style: { color: '#fff' } }}
                />
                <FlatList
                    data={this.state.users}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={async () => await this.handleEndOfList()}
                    onEndReachedThreshold={0}
                    ListFooterComponent={() => this.handleLoading()}
                    renderItem={({ item, index }) => (
                        <View key={item.id} style={this.mainStyles.card}>
                            <TouchableOpacity onPress={() => { this.handleSelectPatient(item, index); }}>
                                <View style={this.mainStyles.horizontalView}>
                                    <Image source={{
                                        uri: item.picture.medium,
                                    }} style={this.mainStyles.image} />
                                    <View>
                                        <Text style={this.mainStyles.caption}>Full Name: </Text>
                                        <Divider style={{ margin: 2 }} />
                                        <Text>{item.name.title} {item.name.first} {item.name.last}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={this.mainStyles.caption}>Address: </Text>
                                    <Divider style={{ margin: 2 }} />
                                    <Text>{item.location.street.number} {item.location.street.name}, {item.location.city}</Text>
                                    <Text>{item.location.state}, {item.location.country}</Text>
                                </View>
                                <View>
                                    <Text style={this.mainStyles.caption}>Contact: </Text>
                                    <Divider style={{ margin: 2 }} />
                                    <Text>{item.email}</Text>
                                    <Text>{item.phone}</Text>
                                    <Text>{item.cell}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}