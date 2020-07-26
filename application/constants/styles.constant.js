export const MainStyles = {
    caption: {
        fontSize: 15,
        color: 'gray',
        marginVertical: 5,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    horizontalView: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 15,
        borderRadius: 15,
        margin: 5,
        padding: 10,
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'stretch',
        margin: 5,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 5,
    },
}