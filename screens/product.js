import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/constants';
import Avatar from '../assets/icons/avatar.png';
import dayjs from 'dayjs';

export default function ProductScreen(props) {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        console.log('product result :', result.data);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onPressButton = () => {
    if (product.soldout !== 1) {
      Alert.alert('구매가 완료되었습니다');
    }
  };

  if (!product) {
    // 위 컴포넌트에서 product가 null 시작한다. 그래서 밑에 product를 불러올때 에러가 난다. 따라서 방어코드를 작성한다. !product는 null=false랑 비슷한 것이다.
    return <ActivityIndicator />; // product가 null이면 이것이 보인다. 로딩 아이콘 같은 역할을 한다. product가 있을때는 밑으로 넘어가 product가 작동한다.
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Image style={styles.avatarImage} source={Avatar} />
            <Text>{product.seller}</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}원</Text>
            <Text style={styles.productDate}>
              {dayjs(product.createdAt).format('YYYY년 MM월 DD일')}
            </Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onPressButton}>
        <View
          style={
            product.soldout ? styles.purchaseDisabled : styles.purchaseButton
          }>
          <Text style={styles.purchaseText}>
            {product.soldout === 1 ? '구매완료' : '구매하기'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // App.js(부모)기준으로 전체영역을 차지한다.
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productSeller: {
    flexDirection: 'row', // 가로로 정렬하기
    alignItems: 'center', // 세로축 기준으로 가운데 정렬
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  productSection: {
    padding: 8,
  },
  divider: {
    backgroundColor: '#e9ecef',
    height: 1,
    marginVertical: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: 'rgb(204,204,204)',
  },
  productDescription: {
    marginTop: 16,
    fontSize: 17,
  },
  purchaseButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgb(255,80,88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseText: {
    color: 'white',
    fontSize: 20,
  },
  purchaseDisabled: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
