from hashlib import sha256
import json

from rest_framework.response import Response
from rest_framework.decorators import api_view


ALLOWED_VOTER_HASHES = [
    'c307f9a91838be2c44ac95c16f90d53219aa5da487d58b2a36c441cec9cbb548',
    '26d0841e99187f02dde5cbf9da8709ae43828e2914ce57887eccb84d7a30e84e',
    '2cd096cab6d452330d003f5755b50a8325949337c5bda815febfb3ae65a174ef',
    '3c7245aa48d67a9f0c0929f9622a5643cbf1bc568d25182d0103d729e4430d5f'
]

BLACKLISTED_VOTER_HASHES = [

]

genesis_voter_hash = 'genesis_voter_hash'

def update_hash(*args):
    hash_text = ''
    for arg in args:
        hash_text += str(arg)
    hash = sha256(hash_text.encode('utf-8'))
    return hash.hexdigest()

class VoteBlock:
    def __init__(self, number = 0, previous_hash = '0' * 64, vote=None, voter_hash=genesis_voter_hash):
        self.vote = vote
        self.number = number
        self.previous_hash = previous_hash
        self.voter_hash = voter_hash
        self.hash_code = self.hash()

    def hash(self):
        return update_hash(
            self.number,
            self.previous_hash,
            self.vote,
            self.voter_hash
        )

    def encode(self):
        return self.__dict__

    def __str__(self):
        return f'VoteBlock: {self.number}\nHash: {self.hash()}\nPrevious Hash: {self.previous_hash}\nVote: {self.vote}'

class Blockchain:

    def __init__(self, chain=[]):
        self.chain = chain

    def add(self, block):
        self.chain.append(block)
    
    def validate(self, block):
        block.previous_hash = self.chain[-1].hash()
        if block.voter_hash in ALLOWED_VOTER_HASHES:
            self.add(block)
            return { 'message': f'Your vote had been cast successfully. You voted for {block.vote}. Thank you for participating in democracy. Your block number is {self.chain[-1].number}', 'block_hash': self.chain[-1].hash(), 'block_number': self.chain[-1].number, 'status': 'success' }
        return {'message': 'Sorry, you are not currently registered to vote.', 'status': 'error'}
            

    def is_valid(self):
        for i in range(1, len(self.chain)):
            previous_hash = self.chain[i].previous_hash
            previous_block = self.chain[i - 1].hash()

            if previous_block != previous_hash:
                return False
        return True
            


blockchain = Blockchain()

genesis = VoteBlock()
blockchain.add(genesis)

@api_view(['GET'])
def get_blockchain(request):
    blockchain_data = json.dumps(blockchain.chain, default=lambda vote_block: vote_block.encode())

    response = {
        'blockchain': blockchain_data,
        'length': len(blockchain.chain),
        'is_valid': blockchain.is_valid()
    }
    return Response(response)

@api_view(['GET'])
def change_blockchain(request):
    blockchain.chain[-2].vote = "Sneeky tampering!!! Alert!!!"
    return Response({'message': 'successful tampering'})


@api_view(['POST'])
def add_vote(request):
    print(request.data)
    vote = request.data.get('vote')
    voter_hash = request.data.get('voter_hash')

    vote_block = VoteBlock(number = blockchain.chain[-1].number + 1, vote = vote, voter_hash=voter_hash)
        
    response = blockchain.validate(vote_block)

    if response.get('status') == 'success':
        ALLOWED_VOTER_HASHES.remove(voter_hash)
        BLACKLISTED_VOTER_HASHES.append(voter_hash)
    else:
        if voter_hash in BLACKLISTED_VOTER_HASHES:
            response = {'message': 'Sorry, you have already cast a vote.'}
        
    return Response(response)

@api_view(['POST'])
def get_vote(request):
    block_number = int(request.data.get('blockNumber'))

    try:
        vote = blockchain.chain[block_number].vote
        return Response({'message': f'Your vote is currently cast for {vote}.'})
    except:
        return Response({'message': 'Your vote cannot be found on the blockchain'})

@api_view(['GET'])
def count_votes(request):
    vote_counts = {}
    for i in range(1, len(blockchain.chain)):
        if blockchain.chain[i].vote in vote_counts:
            vote_counts[blockchain.chain[i].vote] += 1
        else:
            vote_counts[blockchain.chain[i].vote] = 1
    return Response(vote_counts)
