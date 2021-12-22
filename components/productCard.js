import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '../config/constants';
import Avatar from '../assets/icons/avatar.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);
dayjs.locale('ko');

function ProductCard(props) {
  const product = props.product;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Product', {
          // 화면이 전환되면서 데이터를 같이 넣어서 보내줄 수 있다. 2번째 인자에 객체를 넣어서
          id: product.id,
        });
      }}>
      <View style={styles.productCard}>
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
              <Text style={styles.productSellerName}>{product.seller}</Text>
            </View>
            <Text style={styles.productDate}>
              {dayjs(product.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

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
