import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { images } from "../constants";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: [
        /* Sample data from walmart */
        {
          itemId: "501436323",
          name: "Power Wheels Dune Racer Extreme",
          thumbnailImage: images.shirt1,
          color: "Red",
          qty: 1,
          salePrice: "105",
          checked: 1,
        },
        {
          itemId: "35031861",
          name: "Better Homes & Gardens Leighton Twin Over Twin Wood Bunk Bed, Multiple Finishes",
          thumbnailImage: images.shirt2,
          qty: 1,
          color: "Green",
          salePrice: "199",
          checked: 0,
        },
        {
          itemId: "801099131",
          name: "LEGO Star Wars 2019 Advent Calendar 75245 Holiday Building Kit",
          thumbnailImage: images.shirt3,
          qty: 1,
          color: "Blue",
          salePrice: "27.99",
          checked: 1,
        },
        {
          itemId: "42608079",
          name: "Little Tikes Cape Cottage Playhouse, Tan",
          thumbnailImage: images.shirt4,
          color: "Purple",
          qty: 1,
          salePrice: "129.99",
          checked: 0,
        },
        {
          itemId: "247714372",
          name: 'HP 14" Laptop, Intel Core i3-1005G1, 4GB SDRAM, 128GB SSD, Pale Gold, 14-DQ1038wm',
          thumbnailImage: images.shirt5,
          qty: 1,
          color: "Black",
          salePrice: "269",
          checked: 1,
        },
        {
          itemId: "247714376",
          name: 'HP 14" Laptop, Intel Core i3-1005G1, 4GB SDRAM, 128GB SSD, Pale Gold, 14-DQ1038wm',
          thumbnailImage: images.shirt6,
          qty: 1,
          color: "Black",
          salePrice: "269",
          checked: 1,
        },
      ],
    };
  }

  selectHandler = (index, value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
    this.setState({ cartItems: newItems }); // set new state
  };

  selectHandlerAll = (value) => {
    const newItems = [...this.state.cartItems]; // clone the array
    newItems.map((item, index) => {
      newItems[index]["checked"] = value == true ? 0 : 1; // set the new value
    });
    this.setState({
      cartItems: newItems,
      selectAll: value == true ? false : true,
    }); // set new state
  };

  deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            this.setState(updatedCart); /* Update the state */
          },
        },
      ],
      { cancelable: false }
    );
  };

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    this.setState({ cartItems: newItems }); // set new state
  };

  subtotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      return cartItems.reduce(
        (sum, item) =>
          sum + (item.checked == 1 ? item.qty * item.salePrice : 0),
        0
      );
    }
    return 0;
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });

    const { cartItems, cartItemsIsLoading, selectAll } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            marginBottom: 10,
          }}
        >
          <View style={[styles.centerElement, { width: 50, height: 50 }]}>
            <Ionicons name="ios-cart" size={25} color="#000" />
          </View>
          <View style={[styles.centerElement, { height: 50 }]}>
            <Text style={{ fontSize: 18, color: "#000" }}>Shopping Cart</Text>
          </View>
        </View>

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView>
            {cartItems &&
              cartItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    marginBottom: 2,
                    height: 120,
                  }}
                >
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.selectHandler(i, item.checked)}
                    >
                      <Ionicons
                        name={
                          item.checked == 1
                            ? "ios-checkmark-circle"
                            : "ios-checkmark-circle-outline"
                        }
                        size={25}
                        color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                      }}
                      style={{ paddingRight: 10 }}
                    >
                      <Image
                        source={item.thumbnailImage}
                        style={[
                          styles.centerElement,
                          { height: 60, width: 60, backgroundColor: "#eeeeee" },
                        ]}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        alignSelf: "center",
                      }}
                    >
                      <Text numberOfLines={1} style={{ fontSize: 15 }}>
                        {item.name}
                      </Text>
                      <Text numberOfLines={1} style={{ color: "#8f8f8f" }}>
                        {item.color ? "Variation: " + item.color : ""}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ color: "#333333", marginBottom: 10 }}
                      >
                        ${item.qty * item.salePrice}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("less", i)}
                          style={{ borderWidth: 1, borderColor: "#cccccc" }}
                        >
                          <MaterialIcons
                            name="remove"
                            size={22}
                            color="#cccccc"
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: "#cccccc",
                            paddingHorizontal: 7,
                            paddingTop: 3,
                            color: "#bbbbbb",
                            fontSize: 13,
                          }}
                        >
                          {item.qty}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.quantityHandler("more", i)}
                          style={{ borderWidth: 1, borderColor: "#cccccc" }}
                        >
                          <MaterialIcons name="add" size={22} color="#cccccc" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.centerElement, { width: 60 }]}>
                    <TouchableOpacity
                      style={[styles.centerElement, { width: 32, height: 32 }]}
                      onPress={() => this.deleteHandler(i)}
                    >
                      <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        )}

        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: "#fff",
              borderTopWidth: 2,
              borderColor: "#f6f6f6",
              paddingVertical: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.centerElement, { width: 60 }]}>
                <View style={[styles.centerElement, { width: 32, height: 32 }]}>
                  <MaterialCommunityIcons
                    name="ticket"
                    size={25}
                    color="#f0ac12"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Voucher</Text>
                <View style={{ paddingRight: 20 }}>
                  <TextInput
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: "#f0f0f0",
                      height: 25,
                      borderRadius: 4,
                    }}
                    placeholder="Enter voucher code"
                    value={""}
                    onChangeText={(searchKeyword) => {}}
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.centerElement, { width: 60 }]}>
                <TouchableOpacity
                  style={[styles.centerElement, { width: 32, height: 32 }]}
                  onPress={() => this.selectHandlerAll(selectAll)}
                >
                  <Ionicons
                    name={
                      selectAll == true
                        ? "ios-checkmark-circle"
                        : "ios-checkmark-circle-outline"
                    }
                    size={25}
                    color={selectAll == true ? "#0faf9a" : "#aaaaaa"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Select All</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#8f8f8f" }}>SubTotal: </Text>
                  <Text>${this.subtotalPrice().toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 32,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: "#0faf9a",
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => console.log("test")}
              >
                <Text style={{ color: "#ffffff" }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
