import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Touchable,
} from 'react-native';
import Avatar from '../assets/icons/avatar.png';
import { API_URL } from '../config/constants';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import Carousel from 'react-native-snap-carousel';
dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function MainScreen(props) {
  // props -> 부모(상위) 컴포넌트에서 자식컴포넌트에게 prop을 줄 수 있다.
  const [products, setProducts] = React.useState([]); // 네트워크 통신을 통해서 products를 받았을 때
  const [banners, setBanners] = React.useState([]);
  React.useEffect(() => {
    // useEffect가 없으면 계속해서 실행하기 때문에 통신을 하였을때 한번만 받으려고 쓰는 것
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel
          data={banners} // banners는 지금 []형태
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          itemHeight={200}
          renderItem={(obj) => {
            // 자식들을 렌더시킨다. .map()처럼 순회하여 객체를 반환했다시피 객체들을 obj에 넣어준다.
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('배너 클릭');
                }}>
                <Image
                  style={styles.bannerImage}
                  source={{ uri: `${API_URL}/${obj.item.imageUrl}` }}
                  resizeMode="contain"
                />
              </TouchableOpacity> // item까지 가야 banner의 자식이 된다.
            );
          }}
        />
        <Text style={styles.headLine}>판매되는 상품들</Text>
        <View style={styles.productList}>
          {products.map((product, index) => {
            //map()은 '원본리스트'의 처음 인덱스부터 마지막 인덱스까지 순회한다.
            return (
              // react에서  map()을 쓸때 렌더링을 최적화하기 위해 권고하는 방향이 있다. 바로 key값을 넣어주는 것. 순회할때 각각 다른 키를 넣게 되면 빠르게 렌더링 가능하기 때문에.
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Product');
                }}>
                <View style={styles.productCard} key={index}>
                  {product.soldout === 1 && <View style={styles.productBlur} />}
                  <View>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: `${API_URL}/${product.imageUrl}`,
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View style={styles.productContents}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image style={styles.productAvatar} source={Avatar} />
                        <Text style={styles.productSellerName}>
                          {product.seller}
                        </Text>
                      </View>
                      <Text style={styles.productDate}>
                        {dayjs(product.createdAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productCard: {
    width: 300,
    borderColor: 'rgb(230,230,230)',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 210,
  },
  productContents: {
    padding: 8,
  },
  productSeller: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productList: {
    alignItems: 'center',
  },
  headLine: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 24,
  },
  productBlur: {
    position: 'absolute', // 옆에 있는 다른 자식들과 상관없이 부모를 따르게 된다.
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ffffffaa',
    zIndex: 999, //productCard에는 여러개의 레이아웃이 있다. backgroundColor 역시 레이아웃이다. zIndex를 999로 해놓게 되면 제일 최상단 레이아웃으로 올라오게 된다.
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  safeAreaView: {
    flex: 1, // 부모 기준 전체 영역 차지
    backgroundColor: '#fff',
  },
});
